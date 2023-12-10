import gql from "graphql-tag";
import { FetchType, Resolvers } from "../../gql/graphql.types";
import { getMovies } from "../../api/getMovies";
import { toUpper } from "lodash";
import { castToResolverMovies, getCachedKeyword, getMoviesToSave, updateKeywordCache, upsertSearchKeyword } from "./utils";

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
            try {
                const cachedKeyword = await getCachedKeyword(keyword, page ?? 1, { db })

                if ( !cachedKeyword ) {
                    // if not then get the movies from the third party API
                    try {
                        const { movies, metadata: { totalPages }} = await getMovies(keyword, page ?? 1)
                    
                        // Save the movies and the keyboard to the db
                        const moviesToSave = getMoviesToSave(movies)

                        if ( movies.length > 0 ) {
                            try {
                                await upsertSearchKeyword(
                                    keyword,
                                    page ?? 1,
                                    { db },
                                    moviesToSave,
                                    totalPages
                                )
                            } catch (e) {
                                throw new Error(`Database error: ${JSON.stringify(e)}`)
                            }
                        }
                        
                        return {
                            movies,
                            totalPages,
                            fetchType: FetchType.Api
                        }
                    }
                    catch (e) {
                        throw new Error(`API Error ${JSON.stringify(e)}`)
                    }

                } else {
                    // if the keyword is already cached then just return the saved values from the db
                    
                    // increment the cache counter
                    await updateKeywordCache(keyword, page ?? 1, { db })
                    return {
                        movies: castToResolverMovies(cachedKeyword.movies),
                        totalPages: cachedKeyword.totalPage,
                        fetchType: FetchType.Db
                    }
                }
            } catch (e) {
                throw new Error(`Database error: ${JSON.stringify(e)}`)
            }
        }
    }
}

export default { typeDefs, resolvers }