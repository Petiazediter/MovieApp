import gql from "graphql-tag";

const typeDefs = gql`
    query {
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