import MovieCard from "../components/MovieCard";
import React from "react";

export const WatchHisPage = ({ watchHistory, onDelete }) => {
  return (
    <div
      className="container"
      style={{
        margin: "0px",
        paddingRight: "calc(var(--bs-gutter-x))",
        paddingLeft: "calc(var(--bs-gutter-x))",
        paddingTop: "calc(var(--bs-gutter-x))",
      }}
    >
      {watchHistory.length === 0 ? (
        <div className="text-center mt-5">
          <i className="bi bi-film fs-1 text-muted"></i>
          <p className="mt-3 text-muted">You haven't added any movies yet</p>
        </div>
      ) : (
        <div className="row g-4">
          {watchHistory.map((movie) => (
            <div key={movie.id} className="col-4 col-md-3 col-lg-2">
              <MovieCard movie={movie} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
