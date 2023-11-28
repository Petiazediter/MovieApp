import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import express from 'express'
import http from 'http'
import gql from 'graphql-tag'

const typeDefs = gql`
    type Query {
        healthCheck: Boolean
    }
`

const startServer = async () => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs: [typeDefs],
        resolvers: [],
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start()

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server))

    const port = process.env.SERVER_PORT
    await new Promise<void>((resolve) => httpServer.listen({ port: port ? port : 4001 }, resolve))

    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
}

export default { 
    startServer
}