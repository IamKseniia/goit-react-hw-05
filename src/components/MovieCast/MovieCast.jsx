import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../../services/api';
import s from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovieCast(movieId)
      .then(setCast)
      .then(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  const defaultImage =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Actors</h2>
      {cast.length > 0 ? (
        <ul>
          {cast.map(actor => (
            <li key={actor.id} className={s.actorCard}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : defaultImage
                }
                alt={actor.name}
              />
              <p className={s.actorName}>{actor.name}</p>
              <p>Character:</p>
              <p className={s.actorCharacter}>{actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No information</p>
      )}
    </div>
  );
}

export default MovieCast;
