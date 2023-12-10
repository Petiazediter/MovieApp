import { Movie as DbMovie, Prisma } from "@prisma/client";
import { Movie as ResolverMovie } from '../../gql/graphql.types'

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