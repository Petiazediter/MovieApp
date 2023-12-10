import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { gql, useLazyQuery } from '@apollo/client';
import { FetchType, SearchMovieQuery, SearchMovieQueryArguments } from './gql/movies';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import InfoBox from './components/Infobox';
import Pagination from './components/Pagination';
import { ErrorDetails } from './App.style';

function App() {

  const [fetchData, { data, error, loading }] = useLazyQuery<SearchMovieQuery, SearchMovieQueryArguments>(gql`
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
    }`, { fetchPolicy: 'network-only' }
  )

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState<string>('')

  useEffect( () => {
    if ( keyword.replaceAll(' ', '') !== '') {
      fetchData({
        variables: {
          keyword,
          page
        }
      }).then( v => {
        if ( !v.data ) {
          setPage(1)
        }
      })
    }
  }, [keyword, page, fetchData])

  const searchCallback = useCallback( (value: string) => {
    setKeyword(value)
    setPage(1)
  }, [])

  const paginationCallback = useCallback( (page: number) => {
    setPage(page)
  }, [])
  
  return (
    <main className="App">
        <SearchBox onSubmit={searchCallback} />
        { error && <ErrorDetails>
            <summary>Something went wrong</summary>
            { error?.message ?? 'error message' }
          </ErrorDetails>}
        { loading && <InfoBox text={'Fetching data...'} />}
        { data && <>
            <InfoBox text={`Results are pulled from ${data.searchMovies.fetchType}`} />
            <MovieList movieResults={data?.searchMovies ?? {
              movies: [],
              totalPages: 0,
              fetchType: FetchType.API
              }}
            />
        </> }
        <Pagination 
          onChoosePage={paginationCallback}
          currentPage={page} 
          maxPages={data?.searchMovies.totalPages ?? 1} />
    </main>
  );
}

export default App;
