import gql from "graphql-tag";
import { Resolvers } from "../../gql/graphql.types";

const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        coverArt: String!
        description: String!
    }

    type MovieResults {
        movies: [Movie!]!
        totalCount: Int!
    }

    extend type Query {
        searchMovies(keyword: String!, page: Int): MovieResults!
    }
`

const resolvers: Resolvers = {
    Query: {
        searchMovies: async (_root, _args, _context) => {
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
                totalCount: movies.length
            }
        }
    }
}

export default { typeDefs, resolvers }