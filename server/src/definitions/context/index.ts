import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { PrismaClient } from "@prisma/client";

const PRISMA_CLIENT = new PrismaClient();
export interface Context {
    // Add your context properties here
    db: PrismaClient
}

export const resolveContext = async (params: ExpressContextFunctionArgument): Promise<Context> => ({
    db: PRISMA_CLIENT,
})