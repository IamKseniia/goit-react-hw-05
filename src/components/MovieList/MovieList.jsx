import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log(location);

  const defaultImage =
    'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  return (
    <div>
      <ul className={s.movieList}>
        {movies.map(item => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={location} className={s.link}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                    : defaultImage
                }
                alt={item.title}
                style={{
                  width: '100%', // Зображення буде адаптуватися до ширини контейнера
                  height: 'auto', // Висота автоматично буде підлаштовуватись, зберігаючи пропорції
                  objectFit: 'contain', // Обрізає зображення, щоб воно покривало весь контейнер без спотворення
                }}
              />
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
