import gql from "graphql-tag";
import { FetchType, Resolvers } from "../../gql/graphql.types";
import { getMovies } from "../../api/getMovies";
import { toUpper } from "lodash";
import { castToResolverMovies, getMoviesToSave } from "./utils";

const typeDefs = gql`

    enum FetchType {
        API
        DB
    }

    type Movie {
        id: Int!
        title: String!
        overview: String!
        posterImagePath: String
        backgroundImagePath: String
        isAdult: Boolean
        releaseDate: String
    }

    type MovieResults {
        movies: [Movie!]!
        totalPages: Int!
        fetchType: FetchType!
    }

    extend type Query {
        searchMovies(keyword: String!, page: Int): MovieResults!
    }
`

const resolvers: Resolvers = {
    Query: {
        searchMovies: async (_root, { keyword, page }, { db }) => {
            // check if keyword is already cached:
            const twoMinsAgo = new Date(Date.now() - (2 * 60 * 1000)).toISOString()
            const cachedKeyword = await db.searchedKeyword.findUnique({
                where: {
                    keywordIdentifier: {
                        page: page ? page : 1,
                        keyword: toUpper(keyword)
                    },
                    updatedAt: {
                        gte: twoMinsAgo
                    }
                },
                select: {
                    movies: true,
                    totalPage: true,
                }
            })

            if ( !cachedKeyword ) {
                // if not then get the movies from the third party API
                const { movies, metadata: { totalPages }} = await getMovies(keyword, page ?? 1)
                
                // Save the movies and the keyboard to the db
                const moviesToSave = getMoviesToSave(movies)

                if ( movies.length > 0 ) {
                    await db.searchedKeyword.upsert({
                        where: {
                            keywordIdentifier: {
                                keyword: toUpper(keyword),
                                page: page ?? 1,
                            }
                        },
                        update: {
                            // reset cache counter
                            cacheCounter: 0,
                            totalPage: totalPages,
                            movies: {
                                upsert: moviesToSave,
                            },
                        },
                        create: {
                            keyword: toUpper(keyword),
                            page: page ?? 1,
                            cacheCounter: 0,
                            totalPage: totalPages,
                            movies: {
                                connectOrCreate: moviesToSave.map(v => ({
                                    where: v.where,
                                    create: v.create
                                }))
                            }
                        }
                    })
                }
                
                return {
                    movies,
                    totalPages,
                    fetchType: FetchType.Api
                }

            } else {
                // if the keyword is already cached then just return the saved values from the db
                
                // increment the cache counter
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
                    totalPages: cachedKeyword.totalPage,
                    fetchType: FetchType.Db
                }
            }
        }
    }
}

export default { typeDefs, resolvers }