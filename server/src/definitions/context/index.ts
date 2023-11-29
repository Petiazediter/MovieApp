import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { PrismaClient } from "@prisma/client";
import { RedisClient } from "../../cache/redisClient";

const PRISMA_CLIENT = new PrismaClient();
const REDIS_CLIENT = new RedisClient();
export interface Context {
    // Add your context properties here
    db: PrismaClient
    redis: RedisClient
}

export const resolveContext = async (params: ExpressContextFunctionArgument): Promise<Context> => ({
    db: PRISMA_CLIENT,
    redis: REDIS_CLIENT
})