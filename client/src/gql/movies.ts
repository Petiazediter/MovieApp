export type SearchMovieQueryArguments = {
    keyword: string
    page?: number
}

export enum FetchType {
    API,
    DB
}

export type SearchMovieQuery = {
    searchMovies: {
        totalPages: number
        fetchType: FetchType
        movies: Movie[]
    }
}

export type Movie = {
    id: number
    backgroundPath?: string
    posterImagePath?: string
    releaseDate?: string
    title: string
    isAdult?: boolean
    overview: string
}