import gql from "graphql-tag";

const typeDefs = gql`
    type Movie {
        id: Number!
        title: String!
        coverArt: String!
        description: String!
    }
`

const resolvers = {
    
}

export default { typeDefs, resolvers }