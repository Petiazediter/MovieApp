import { useCallback } from "react"
import { Movie, SearchMovieQuery } from "../../gql/movies"
import Styled from "./styles"
import Empty from "./EmptyState"

type Props = {
    movieResults: SearchMovieQuery['searchMovies']
}

export const MovieList = ({ movieResults }: Props) => {
    
    const getLink = useCallback( (movie: Movie) => {
        return `http://image.tmdb.org/t/p/w500/${movie.posterImagePath ?? movie.backgroundPath ?? undefined}`
    }, [])
    
    if ( movieResults.movies.length === 0 ) {
        return <Empty />
    }

    return <Styled.List>
        {movieResults.movies.map((movie) => (<Styled.ListItem key={movie.id}>
            <Styled.PosterImage 
                src={getLink(movie)}
            />
            <Styled.MovieDetail className="detail">
                <Styled.MovieTitle>{movie.title}</Styled.MovieTitle>
                {movie.releaseDate && <p>{new Date(movie.releaseDate).getFullYear()}</p>}
            </Styled.MovieDetail>

            <Styled.MovieDescription className="desc">
                {movie.overview}
            </Styled.MovieDescription>
        </Styled.ListItem>))}
    </Styled.List>
}

export default MovieList