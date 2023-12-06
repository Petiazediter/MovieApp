import { Movie, Prisma } from "@prisma/client";
import { Movie as DbMovie } from '../../gql/graphql.types'

export const castToResolverMovies = (movies: Movie[]): DbMovie[] => {
    return movies.map(movie => {
        return {
            ...movie,
            id: movie.id,
            releaseDate: movie.releaseDate.toISOString()
        }
    })
}

export const getMoviesToSave = (moviesFromApi: DbMovie[]): Prisma.MovieUpsertWithWhereUniqueWithoutSearchedKeywordsInput[] => 
    moviesFromApi.filter(v => (v.id && true))
    .map(movie => ({
    where: {
        id: movie.id,
    },
    update: {
        ...movie,
        releaseDate: new Date(movie.releaseDate ?? Date.now()),
        isAdult: movie.isAdult ?? undefined,
    },
    create: {
        ...movie,
        releaseDate: new Date(movie.releaseDate ?? Date.now()),
        isAdult: movie.isAdult ?? false, 
    }
}))