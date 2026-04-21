import MovieCard from '../components/MovieCard';
import React from 'react';


export const WatchlistPage = ({ watchlist, moveToHistory, onDelete }) => {
  return (
    <div className="container mt-3">
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {watchlist.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} onMove={moveToHistory} onDelete={onDelete}/>
          </div>
        ))}
      </div>
    </div>
  );
};