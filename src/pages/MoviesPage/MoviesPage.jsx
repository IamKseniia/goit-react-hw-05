import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../../services/api';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const query = searchParams.get('query') ?? '';

  const handleChangeQuery = value => {
    searchParams.set('query', value);
    setSearchParams(searchParams);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await searchMovies(query, page);
        setTotalPages(data.total_pages);
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleScroll = event => {
    const bottom =
      event.target.scrollHeight ===
      event.target.scrollTop + event.target.clientHeight;
    if (bottom && !loading && !error && page < totalPages) {
      loadMore();
    }
  };

  return (
    <div onScroll={handleScroll} style={{ height: '100vh', overflowY: 'auto' }}>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <MovieList movies={movies} />
    </div>
  );
}
