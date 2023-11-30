import { Movie } from "@prisma/client";
import { Movie as DbMovie } from '../../gql/graphql.types'

export const castToResolverMovies = (movies: Movie[]): DbMovie[] => {
    return movies.map(movie => ({
        ...movie,
        coverArt: movie.posterImagePath,
        description: movie.overview,
        id: Number(movie.id),
    }))
}