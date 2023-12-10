import { ApolloServer } from '@apollo/server';
import * as utils from './utils'
import * as api from '../../api/getMovies'
import { Context } from '../context';
import { getServerEntities } from '../../server';
import assert from 'assert';
import { FetchType, Movie } from '../../gql/graphql.types';
import { Prisma } from '@prisma/client';

const fakeMovies = [
    {
        id: 1,
        title: 'mock movie',
        overview: 'string',
        releaseDate: new Date(),
        backgroundImagePath: null,
        posterImagePath: null,
        isAdult: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]
const mockCachedKeyword = {
    totalPage: 1,
    movies: fakeMovies
}

const mockMoviesToSave: Prisma.MovieUpsertWithWhereUniqueWithoutSearchedKeywordsInput[] = [
    {
        where: {
            id: fakeMovies[0].id,
        },
        update: {
            ...fakeMovies[0],
        },
        create: {
            ...fakeMovies[0],
        }
    }
]

describe('Movies', () => {
    
    let testServer: ApolloServer<Context>;
    
    beforeAll( () => {
        testServer = getServerEntities().server;
    })

    it('should pull data from db if there is existing data', async () => { 
        const cachedKeywordSpy = jest.spyOn(utils, 'getCachedKeyword')
            .mockImplementation( (keyword, page, context) => {
                return new Promise(resolve => resolve(mockCachedKeyword))
            })

        const updateKeywordCacheSpy = jest.spyOn(utils, 'updateKeywordCache')
            .mockImplementation( (keyword, page, context) => {
                return new Promise(resolve => resolve())
            })
        
        const response = await testServer.executeOperation<{ searchMovies: {
            fetchType: FetchType,
            movies: Movie[],
            totalPages: number
        }}>({
            query: `
                query ExampleQuery($keyword: String!, $page: Int) {
                    searchMovies(keyword: $keyword, page: $page) {
                        fetchType
                        movies {
                        overview
                        backgroundImagePath
                        posterImagePath
                        id
                        releaseDate
                        title
                        isAdult
                        }
                        totalPages
                    }
                }
            `,
            variables: {
                keyword: 'matrix',
                page: 1
            }
        })
        
        expect(cachedKeywordSpy).toHaveBeenCalledWith('matrix', 1, { db: undefined })
        expect(updateKeywordCacheSpy).toHaveBeenCalled()
        
        assert(response.body.kind === 'single')
        expect(response.body.singleResult.data?.searchMovies.fetchType).toBe(FetchType.Db)
    })

    it('should pull data from API if there is no existing data', async () => { 
        
        // no keyword found in db
        const cachedKeywordSpy = jest.spyOn(utils, 'getCachedKeyword')
            .mockImplementation( (keyword, page, context) => {
                return new Promise(resolve => resolve(null))
            })

        const getMoviesSpy = jest.spyOn(api, 'getMovies')
            .mockImplementation( () => 
                new Promise(resolve => {
                    resolve({
                        movies: fakeMovies.map(v => ({
                            ...v,
                            releaseDate: v.releaseDate.toISOString(),
                        })),
                        metadata: {
                            totalPages: 1,
                            totalResults: 1
                        }
                    })
                })
            )
        
        const getMoviesToSave = jest.spyOn(utils, 'getMoviesToSave')
                .mockImplementation( () => mockMoviesToSave)

        const upsertSpy = jest.spyOn(utils, 'upsertSearchKeyword')
                .mockImplementation( () => new Promise(resolve => 
                    resolve()
                ))

        const response = await testServer.executeOperation<{ searchMovies: {
            fetchType: FetchType,
            movies: Movie[],
            totalPages: number
        }}>({
            query: `
                query ExampleQuery($keyword: String!, $page: Int) {
                    searchMovies(keyword: $keyword, page: $page) {
                        fetchType
                        movies {
                        overview
                        backgroundImagePath
                        posterImagePath
                        id
                        releaseDate
                        title
                        isAdult
                        }
                        totalPages
                    }
                }
            `,
            variables: {
                keyword: 'matrix',
                page: 1
            }
        })
        
        expect(cachedKeywordSpy).toHaveBeenCalledWith('matrix', 1, { db: undefined })
        expect(getMoviesSpy).toHaveBeenCalled()
        expect(getMoviesToSave).toHaveBeenCalled()
        expect(upsertSpy).toHaveBeenCalled()

        assert(response.body.kind === 'single')
        expect(response.body.singleResult.data?.searchMovies.fetchType).toBe(FetchType.Api)
    })
})