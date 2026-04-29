import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { WatchlistPage } from "./pages/WatchlistPage";
import { SearchPage } from "./pages/SearchPage";
import { WatchHisPage } from "./pages/WatchHisPage";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";
import { NotFoundPage } from "./pages/404Page";

// Main app component managing watchlist and history state
export const App = () => {
  const [watchlist, setWatchlist] = useState([]); // Movies user wants to watch
  const [watchHistory, setWatchHistory] = useState([]); // Movies user has watched
  const location = useLocation(); // Track page changes to reload data

  // Fetch watchlist from backend
  const loadWatchlist = () => {
    fetch("http://localhost:5001/api/watchlist")
      .then((res) => res.json())
      .then((data) => setWatchlist(data || []));
  };

  const loadHistory = () => {
    fetch("http://localhost:5001/api/history")
      .then((res) => res.json())
      .then((data) => setWatchHistory(data || []));
  };

  // Move movie from watchlist to history
  const moveToHistory = (movie) => {
    // Optimistic update - update UI immediately
    setWatchlist((prev) => prev.filter((m) => m.tmdbId !== movie.tmdbId));
    setWatchHistory((prev) => [...prev, movie]);
    toast.success(`${movie.title} has been moved to Watch History`);

    // Then sync with backend
    fetch("http://localhost:5001/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tmdbId: movie.tmdbId }),
    })
      .then(() =>
        fetch(`http://localhost:5001/api/watchlist/${movie.tmdbId}`, {
          method: "DELETE",
        }),
      )
      .catch(() => {
        // If request fails, revert the optimistic update
        setWatchlist((prev) => [...prev, movie]);
        setWatchHistory((prev) =>
          prev.filter((m) => m.tmdbId !== movie.tmdbId),
        );
        toast.error(`Failed to move ${movie.title} to Watch History`);
      });
  };
  // Remove movie from watchlist
  const deleteFromWatchlist = (movie) => {
    // Optimistic update - update UI immediately
    setWatchlist((prev) => prev.filter((m) => m.tmdbId !== movie.tmdbId));
    toast.error(`${movie.title} has been removed from Watchlist`);

    // Then sync with backend
    fetch(`http://localhost:5001/api/watchlist/${movie.tmdbId}`, {
      method: "DELETE",
    }).catch(() => {
      // If request fails, revert the optimistic update
      loadWatchlist();
      toast.error(`Failed to remove ${movie.title} from Watchlist`);
    });
  };

  // Remove movie from watch history
  const deleteFromHistory = (movie) => {
    // Optimistic update - update UI immediately
    setWatchHistory((prev) => prev.filter((m) => m.tmdbId !== movie.tmdbId));
    toast.error(`${movie.title} has been removed from Watch History`);

    // Then sync with backend
    fetch(`http://localhost:5001/api/history/${movie.tmdbId}`, {
      method: "DELETE",
    }).catch(() => {
      // If request fails, revert the optimistic update
      loadHistory();
      toast.error(`Failed to remove ${movie.title} from Watch History`);
    });
  };

  // Reload data when navigating to different pages
  useEffect(() => {
    loadWatchlist();
    loadHistory();
  }, [location.pathname]);

  const isNotFoundPage =
    location.pathname !== "/" &&
    location.pathname !== "/search" &&
    location.pathname !== "/history";

  return (
    <div>
      {!isNotFoundPage && <NavBar />}
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <WatchlistPage
              watchlist={watchlist}
              moveToHistory={moveToHistory}
              onDelete={deleteFromWatchlist}
            />
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/history"
          element={
            <WatchHisPage
              watchHistory={watchHistory}
              onDelete={deleteFromHistory}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
