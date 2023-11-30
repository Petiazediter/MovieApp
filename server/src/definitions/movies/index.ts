import gql from "graphql-tag";
import { FetchType, Resolvers } from "../../gql/graphql.types";
import { getMovies } from "../../api/getMovies";
import { toUpper } from "lodash";
import { Prisma } from "@prisma/client";
import { castToResolverMovies } from "./utils";

const typeDefs = gql`

    enum FetchType {
        API
        DB
    }

    type Movie {
        id: Int!
        title: String!
        coverArt: String!
        description: String!
    }

    type MovieResults {
        movies: [Movie!]!
        totalCount: Int!
        fetchType: FetchType!
    }

    extend type Query {
        searchMovies(keyword: String!, page: Int): MovieResults!
    }
`

const resolvers: Resolvers = {
    Query: {
        searchMovies: async (_root, { keyword, page }, { db }) => {
            const cachedKeyword = await db.searchedKeyword.findUnique({
                where: {
                    keywordIdentifier: {
                        page: page ? page : 1,
                        keyword: toUpper(keyword)
                    },
                    updatedAt: {
                        gte: new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString()
                    }
                },
                select: {
                    movies: true,
                }
            })

            if ( !cachedKeyword ) {
                // get movies from api
                const { movies, metadata: { totalPages, totalResults }} = await getMovies(keyword, page ?? 1)
                // save movies to db

                const moviesToSave = movies.map( movie => {
                    const cause: Prisma.MovieCreateOrConnectWithoutSearchedKeywordsInput = {
                        where: {
                            id: movie.id.toString(),
                        },
                        create: {
                            id: movie.id.toString(),
                            title: movie.title,
                            overview: movie.description,
                            releaseDate: new Date(),
                            backgroundImagePath: movie.coverArt,
                            posterImagePath: movie.coverArt,
                            isAdult: false, 
                        }
                    }

                    return cause
                })

                if ( movies.length > 0 ) {
                    await db.searchedKeyword.upsert({
                        where: {
                            keywordIdentifier: {
                                keyword: toUpper(keyword),
                                page: page ?? 1,
                            }
                        },
                        update: {
                            // update cache counter
                            movies: {
                                connectOrCreate: moviesToSave,
                            },
                        },
                        create: {
                            keyword: toUpper(keyword),
                            page: page ?? 1,
                            movies: {
                                connectOrCreate: moviesToSave, 
                            }
                        }
                    })
                }
                
                return {
                    movies,
                    totalCount: totalResults,
                    fetchType: FetchType.Api
                }
            } else {

                await db.searchedKeyword.update({
                    where: {
                        keywordIdentifier: {
                            keyword: toUpper(keyword),
                            page: page ?? 1,
                        }
                    },
                    data: {
                        cacheCounter: {
                            increment: 1,
                        }
                    }
                })

                return {
                    movies: castToResolverMovies(cachedKeyword.movies),
                    totalCount:0,
                    fetchType: FetchType.Db
                }
            }
        }
    }
}

export default { typeDefs, resolvers }