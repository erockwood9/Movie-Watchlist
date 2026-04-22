import MovieCard from "../components/MovieCard";
import React from "react";

export const WatchHisPage = ({ watchHistory, onDelete }) => {
  return (
    <div className="container mt-3">
      {watchHistory.length === 0 ? (
        <div className="text-center mt-5">
          <i className="bi bi-film fs-1 text-muted"></i>
          <p className="mt-3 text-muted">You haven't added any movies yet</p>
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {watchHistory.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
