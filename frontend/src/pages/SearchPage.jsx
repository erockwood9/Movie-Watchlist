import React, { useState } from "react";
import toast from "react-hot-toast";

// Page for searching and adding movies to watchlist or history
export const SearchPage = () => {
  const [query, setQuery] = useState(""); // Search input
  const [results, setResults] = useState([]); // Search results

  // Build TMDB poster URL
  const getPosterUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w92${path}` : null;
  // Search movies via backend API
  const searchMovies = async () => {
    if (!query) return;
    const res = await fetch(
      `http://localhost:5001/api/movies/search?query=${query}`,
    );
    const data = await res.json();
    setResults(data?.tmdbResults || []);
  };

  // Add movie to user's watchlist
  const addToWatchList = async (tmdbId) => {
    try {
      const res = await fetch("http://localhost:5001/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success("Added to Watchlist");
      } else if (res.status === 200) {
        toast.info("Movie is already in your watchlist");
      } else {
        toast.error("Failed to add movie");
      }
    } catch (error) {
      toast.error("Error adding movie");
    }
    onAdded?.();
  };

  // Add movie directly to watch history
  const addToHistory = async (tmdbId) => {
    try {
      const res = await fetch("http://localhost:5001/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success("Added to History");
      } else {
        toast.error("Failed to add movie");
      }
    } catch (error) {
      toast.error("Error adding movie");
    }
    onAdded?.();
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {/* Search input - enter to search */}
      <div className="w-50">
        <input
          className="form-control"
          placeholder="Search For A Movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies();
            }
          }}
          style={{ height: "50px", fontSize: "18px" }}
        />
      </div>
      {/* Display search results as a list of cards */}
      <div className="row mt-4">
        {(results || []).map((movie) => (
          <div key={movie.tmdbId} className="card mb-3 p-3">
            <div className="d-flex align-items-center">
              <img
                src={getPosterUrl(movie.poster_path)}
                style={{
                  width: "60px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <div className="flex-grow-1 px-3">
                <h5 className="mb-0">{movie.title}</h5>
              </div>
              <div className="pe-3 d-flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => addToWatchList(movie.tmdbId)}
                >
                  + Watchlist
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => addToHistory(movie.tmdbId)}
                >
                  + History
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
