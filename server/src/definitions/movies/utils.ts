import { Movie as DbMovie, Prisma } from "@prisma/client";
import { Movie as ResolverMovie } from '../../gql/graphql.types'
import { Context } from "../context";
import { toUpper } from "lodash";

// From database => GRAPHQL Resolver
export const castToResolverMovies = (movies: DbMovie[]): ResolverMovie[] => {
    return movies.map(movie => {
        return {
            ...movie,
            releaseDate: movie.releaseDate.toISOString()
        }
    })
}

export const getMoviesToSave = (moviesFromApi: ResolverMovie[]): Prisma.MovieUpsertWithWhereUniqueWithoutSearchedKeywordsInput[] => 
    moviesFromApi.filter(v => (v.id && true))
    .map(movie => {
        console.log(`Date:${movie.releaseDate}:`)
        return {
            where: {
                id: movie.id,
            },
            update: {
                ...movie,
                releaseDate: movie.releaseDate?.replaceAll(' ', '') === ''
                     ? new Date() 
                     : new Date(movie.releaseDate ?? Date.now()),
                isAdult: movie.isAdult ?? false,
            },
            create: {
                ...movie,
                releaseDate: movie.releaseDate?.replaceAll(' ', '') === '' 
                    ? new Date() 
                    : new Date(movie.releaseDate ?? Date.now()),
                isAdult: movie.isAdult ?? false, 
            }
    }
})

export const getCachedKeyword = async (keyword: string, page: number = 1, context: Context) => {
    const twoMinsAgo = new Date(Date.now() - (2 * 60 * 1000)).toISOString()
    return context.db.searchedKeyword.findUnique({
        where: {
            keywordIdentifier: {
                page: page ? page : 1,
                keyword: toUpper(keyword)
            },
            updatedAt: {
                gte: twoMinsAgo
            }
        },
        select: {
            movies: true,
            totalPage: true,
        }
    })
}

export const upsertSearchKeyword = async (
    keyword: string,
    page: number,
    { db }: Context,
    movies: Prisma.MovieUpsertWithWhereUniqueWithoutSearchedKeywordsInput[],
    totalPages: number
) => {
    await db.searchedKeyword.upsert({
        where: {
            keywordIdentifier: {
                keyword: toUpper(keyword),
                page: page ?? 1,
            }
        },
        update: {
            // reset cache counter
            cacheCounter: 0,
            totalPage: totalPages,
            movies: {
                upsert: movies,
            },
        },
        create: {
            keyword: toUpper(keyword),
            page: page ?? 1,
            cacheCounter: 0,
            totalPage: totalPages,
            movies: {
                connectOrCreate: movies.map(v => ({
                    where: v.where,
                    create: v.create
                }))
            }
        }
    })
}

export const updateKeywordCache = async (
    keyword: string,
    page: number,
    { db }: Context
) => {
    await db.searchedKeyword.update({
        where: {
            keywordIdentifier: {
                keyword: toUpper(keyword),
                page: page ?? 1,
            }
        },
        data: {
            cacheCounter: {
                increment: 1,
            }
        }
    })
}