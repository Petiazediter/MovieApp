import { useCallback } from "react"
import { Movie, SearchMovieQuery } from "../../gql/movies"
import Styled from "./styles"

type Props = {
    movieResults: SearchMovieQuery['searchMovies']
}

export const MovieList = ({ movieResults }: Props) => {
    
    const getLink = useCallback( (movie: Movie) => {
        return `http://image.tmdb.org/t/p/w500/${movie.posterImagePath ?? movie.backgroundPath ?? undefined}`
    }, [])
    
    if ( movieResults.movies.length === 0 ) {
        return <>Empty list</>
    }

    return <Styled.List>
        {movieResults.movies.map((movie) => (<Styled.ListItem key={movie.id}>
            <Styled.PosterImage 
                src={getLink(movie)}
                alt="Poster of the movie"
            />
        </Styled.ListItem>))}
    </Styled.List>
}

export default MovieList