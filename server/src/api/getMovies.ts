import { Movie } from "../gql/graphql.types";
import axios from "axios";

interface MovieApiResponse {
    page: number,
    total_pages: number,
    total_results: number,    
    results: MovieApiResult[]
}

interface MovieApiResult {
    adult: boolean,
    id: number,
    overview: string,
    poster_path: string,
    title: string,
    release_date: string
}

interface MoviesData {
    movies: Movie[],
    metadata: {
        totalPages: number,
        totalResults: number
    }
}

export const getMovies = (query: string, page: number): Promise<MoviesData> => {
    return new Promise((resolve, reject) => {
        try {
            axios.get<MovieApiResponse>(`https://api.themoviedb.org/3/search/movie?query=${query.replaceAll(' ', '%20')}&include_adult=false&language=en-US&page=${page}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.MOVIE_DB_READ_ACCESS_TOKEN}`
                }
            }).then(response => {
                resolve({
                    movies: castMovies(response.data),
                    metadata:{
                        totalPages: response.data.total_pages,
                        totalResults: response.data.total_results
                    }
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

const castMovies = (movies: MovieApiResponse): Movie[] => {
    return movies.results.map(apiMovie => ({
        id: apiMovie.id,
        isAdult: apiMovie.adult,
        overview: apiMovie.overview,
        title: apiMovie.title,
        posterImagePath: apiMovie.poster_path,
        backgroundImagePath: apiMovie.poster_path,
        releaseDate: apiMovie.release_date
    }))
}