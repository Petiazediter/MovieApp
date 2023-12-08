import './App.css'
import { gql, useLazyQuery } from '@apollo/client';
import { FetchType, SearchMovieQuery, SearchMovieQueryArguments } from './gql/movies';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
