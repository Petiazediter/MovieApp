import gql from "graphql-tag";
import { FetchType, Resolvers } from "../../gql/graphql.types";
import { getMovies } from "../../api/getMovies";

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

            const keywordsMatch = await db.searchedKeyword.findMany({
                where: {
                    keyword: {
                        equals: keyword,
                        mode: 'insensitive'
                    }
                }
            })

            const movies = [
                {
                    id: 1,
                    title: 'The Matrix',
                    coverArt: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
                    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
                }
            ]

            return {
                movies,
                totalCount: movies.length,
                fetchType: FetchType.Api
            }
        }
    }
}

export default { typeDefs, resolvers }