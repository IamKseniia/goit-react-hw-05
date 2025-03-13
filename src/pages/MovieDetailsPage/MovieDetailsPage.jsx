import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../../services/api';
import './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackUrl = location.state?.from ?? '/movies';
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const defaultImage =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  return (
    <div>
      <NavLink to={goBackUrl.current}>Go back</NavLink>
      {error && (
        <p>
          There was an error loading movie information. Please try again later.
        </p>
      )}
      {loading && <p>Loading movies...</p>}
      {!loading && !error && (
        <div>
          <div>
            <div>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultImage
                }
                alt={movie.title}
                width="240"
              />
            </div>
            <div>
              <h2>{movie.title}</h2>
              <p>Rating: {movie.vote_average.toFixed(1)}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              {movie.genres.length !== 0 ? (
                <div>{movie.genres.map(({ name }) => name).join(', ')}</div>
              ) : (
                <p>No information</p>
              )}
            </div>
          </div>
          <nav>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </nav>
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
