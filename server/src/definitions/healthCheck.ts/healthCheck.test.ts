import { ApolloServer } from "@apollo/server";
import { getServerEntities } from "../../server";
import assert from "assert";
import { Context } from "../context";

describe('Health Check', () => {
    let testServer: ApolloServer<Context>;
    
    beforeAll( () => {
        testServer = getServerEntities().server;
    })

    it('Health-Check query should return true', async () => {
        const response = await testServer.executeOperation({
            query: `
                query HealthCheck {
                    healthCheck
                }
            `
        })

        assert(response.body.kind === 'single')
        expect(response.body.singleResult.errors).toBeUndefined()
        expect(response.body.singleResult.data?.healthCheck).toBe(true)
    });
});