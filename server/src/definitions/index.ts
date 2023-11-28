import movies from './movies'
import healthCheck from './healthCheck.ts'
import { flattenDeep, merge } from 'lodash'
import { DocumentNode } from 'graphql'
import { Resolvers } from '../gql/graphql.types'

export default { 
    resolvers: merge([healthCheck.resolvers, movies.resolvers] as Resolvers[]),
    typeDefs: flattenDeep([movies.typeDefs, healthCheck.typeDefs] as DocumentNode[])
}
