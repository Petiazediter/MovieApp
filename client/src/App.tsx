import { useCallback } from 'react';
import './App.css'
import { gql, useLazyQuery } from '@apollo/client';
import { FetchType, SearchMovieQuery, SearchMovieQueryArguments } from './gql/movies';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';

function App() {

  const [fetchData, { data, error }] = useLazyQuery<SearchMovieQuery, SearchMovieQueryArguments>(gql`
    query SearchQuery($keyword: String!, $page: Int) {
      searchMovies(keyword: $keyword, page: $page) {
        fetchType
        movies {
          id   
          overview
          backgroundImagePath
          posterImagePath
          releaseDate
          title
        }
        totalPages
      } 
    }`
  )

  const callback = useCallback( (value: string) => {
    fetchData({variables: {
      keyword: value,
      page: 1,
    }})
  }, [fetchData])
  
  return (
    <main className="App">
        <SearchBox onSubmit={callback} />
        <MovieList movieResults={data?.searchMovies ?? {
          movies: [],
          totalPages: 0,
          fetchType: FetchType.API
        }} />
    </main>
  );
}

export default App;
