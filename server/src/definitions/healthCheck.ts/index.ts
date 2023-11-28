import gql from "graphql-tag";

const typeDefs = gql`
    type Query {
        healthCheck: Boolean!
    }
`

const resolvers = {
    Query: {
        healthCheck: () => true
    }
}

export default {
    resolvers,
    typeDefs
}