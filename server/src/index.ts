import dotenv from 'dotenv'
import server from './server'

dotenv.config()

server.startServer()
    .catch((err) => console.error(err))