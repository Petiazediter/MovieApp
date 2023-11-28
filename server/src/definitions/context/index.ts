import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";

export interface Context {
    // Add your context properties here
}

export const resolveContext = async (params: ExpressContextFunctionArgument): Promise<Context> => {
    return {}
}