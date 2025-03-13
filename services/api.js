import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDc4ZjRmYzZmMDJiNjcxOGZlZmM5ZDMwOTJhNjY4MiIsIm5iZiI6MTc0MDUwMjc3NS41MDMsInN1YiI6IjY3YmRmNmY3OTYxMzFmMGZlYzVlYTJkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zFPxQ8heMJtmOzyKHpmHt8dZX19I3K-Q0AsGS-2ekYs';

const BASE_URL = 'https://api.themoviedb.org/3';

const options = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export async function getTrendingMovie(page) {
  const { data } = await options.get('/trending/movie/day', {
    params: { page },
  });
  return data;
}

export async function searchMovies(query, page) {
  const { data } = await options.get('/search/movie', {
    params: { query, page },
  });
  return data;
}

export async function getMovieDetails(movieId) {
  const { data } = await options.get(`/movie/${movieId}`);
  return data;
}

export async function getMovieCast(movieId) {
  const { data } = await options.get(`/movie/${movieId}/credits`);
  return data.cast;
}

export async function getMovieReviews(movieId) {
  const { data } = await options.get(`/movie/${movieId}/reviews`);
  return data.results;
}
