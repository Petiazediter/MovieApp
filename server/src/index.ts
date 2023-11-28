import dotenv from 'dotenv'
import server from './server'

dotenv.config()

server.run()
    .catch((err) => console.error(err))