import { createClient } from "redis"

type RedisClientType = ReturnType<typeof createClient>

export class RedisClient {
    private redisClient: RedisClientType | undefined;

    public async getClient() {
        if  ( !this.redisClient ) {
            const client = createClient()
            client.on('error', err => console.log('Redis Client Error', err))
            client.connect()
            this.redisClient = client
        } 
        return this.redisClient;
    }
}