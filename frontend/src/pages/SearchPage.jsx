import React, { useState } from 'react'
import toast from 'react-hot-toast';

export const SearchPage = () => {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    if (!query) return;
    const res = await fetch(`http://localhost:5001/api/movies/search?query=${query}`);
    const data = await res.json();
    setResults(data?.tmdbResults || []);
  };

  const addToWatchList = async (tmdbId) => {
    await fetch("http://localhost:5001/api/watchlist", {method: "POST", headers: {"Content-Type": "application/json", }, body: JSON.stringify({ tmdbId}), });
    toast.success("Added to Watchlist");

    onAdded?.();
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
        <div className="w-50">
            <input
                className="form-control"
                placeholder="Search For A Movie"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") {searchMovies();}}}/>
        </div>
        <div className="row mt-4">
          {(results || []).map((movie) => (
            <div key={movie.tmdbId} className="card mb-3">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 px-3">
                  <h6 className="mb=0">{movie.title}</h6>
                </div>
                <div className="pe-3">
                  <button className="btn btn-success btn-sm" onClick={() => addToWatchList(movie.tmdbId)}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}