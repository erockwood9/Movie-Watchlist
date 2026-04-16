import MovieCard from '../components/MovieCard';
import React, { useState } from 'react';

export const WatchlistPage = () => {
  const [movies, setMovies] = useState([
  {
    id: 1,
    title: 'Inception',
    length: '2h 28m',
    director: 'Christopher Nolan',
    rating: 'PG-13',
    poster: 'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
  }
]);

  return (
  <div className="container mt-3">
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </div>
  );
}
