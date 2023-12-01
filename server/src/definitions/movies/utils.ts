import { Movie, Prisma } from "@prisma/client";
import { Movie as DbMovie } from '../../gql/graphql.types'

export const castToResolverMovies = (movies: Movie[]): DbMovie[] => {
    return movies.map(movie => ({
        ...movie,
        coverArt: movie.posterImagePath,
        description: movie.overview,
        id: Number(movie.id),
        releaseDate: movie.releaseDate.toLocaleString()
    }))
}

export const getMoviesToSave = (moviesFromApi: DbMovie[]): Prisma.MovieUpsertWithWhereUniqueWithoutSearchedKeywordsInput[] => moviesFromApi.map(movie => ({
    where: {
        id: movie.id.toString(),
    },
    update: {
        title: movie.title,
        overview: movie.description,
        releaseDate: movie.releaseDate ?? undefined,
        backgroundImagePath: movie.coverArt ?? null,
        posterImagePath: movie.coverArt ?? null,
        isAdult: false,
    },
    create: {
        id: movie.id.toString(),
        title: movie.title,
        overview: movie.description,
        releaseDate: movie.releaseDate ?? new Date(),
        backgroundImagePath: movie.coverArt ?? null,
        posterImagePath: movie.coverArt ?? null,
        isAdult: false, 
    }
}))