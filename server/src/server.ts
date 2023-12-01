import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import express from 'express'
import http from 'http'
import definitions from './definitions'
import { Context, resolveContext } from './definitions/context'

export const getServerEntities = () => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer<Context>({
        typeDefs: definitions.typeDefs,
        resolvers: definitions.resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    return { app, httpServer, server }
}

const run = async () => {
    
    const { app, httpServer, server } = getServerEntities()

    await server.start()

    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
        context: resolveContext
    }))

    const port = process.env.SERVER_PORT
    await new Promise<void>((resolve) => httpServer.listen({ port: port ? port : 4001 }, resolve))

    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
}

export default { 
    run
}