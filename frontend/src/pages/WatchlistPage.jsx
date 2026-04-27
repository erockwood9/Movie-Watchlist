import MovieCard from "../components/MovieCard";
import FilterComponent from "../components/FilterComponent";
import React, { useState, useMemo } from "react";

// Display all movies in the user's watchlist
export const WatchlistPage = ({ watchlist, moveToHistory, onDelete }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Apply filtering and sorting logic
  const filteredMovies = useMemo(() => {
    let sorted = [...watchlist];

    if (selectedFilter === "release-date") {
      sorted.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    } else if (selectedFilter === "a-z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedFilter === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (selectedFilter === "length") {
      sorted.sort((a, b) => b.length_minutes - a.length_minutes);
    }

    return sorted;
  }, [watchlist, selectedFilter]);

  return (
    <div
      className="container"
      style={{
        paddingRight: "calc(var(--bs-gutter-x))",
        paddingLeft: "calc(var(--bs-gutter-x))",
        paddingTop: "calc(var(--bs-gutter-x))",
      }}
    >
      {/* Filter component */}
      {watchlist.length > 0 && (
        <FilterComponent onFilterChange={setSelectedFilter} />
      )}

      {/* Show empty state or list of movies */}
      {watchlist.length === 0 ? (
        <div className="text-center mt-5">
          <i className="bi bi-film fs-1 text-muted"></i>
          <p className="mt-3 text-muted">You haven't added any movies yet</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="col-4 col-md-3 col-lg-2">
              <MovieCard
                movie={movie}
                onMove={moveToHistory}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
