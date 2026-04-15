import React from 'react'
import MovieCard from '../components/MovieCard';

export const WatchlistPage = () => {
  const sampleMovie = {
    title: 'Inception',
    length: '2h 28m',
    director: 'Christopher Nolan',
    rating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
  };

  return (
    <div>
      <h1>Watchlist</h1>
      <MovieCard movie={sampleMovie} />
    </div>
  );
}
