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

export const App = () => {
  const [watchlist, setWatchlist] = useState([]);

  const [watchHistory, setWatchHistory] = useState([]);

  const location = useLocation();

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

  const moveToHistory = (movie) => {
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
      .then(() => {
        setWatchlist((prev) => prev.filter((m) => m.tmdbId !== movie.tmdbId));
        setWatchHistory((prev) => [...prev, movie]);
        toast.success(`${movie.title} has been moved to Watch History`);
      });
  };
  const deleteFromWatchlist = (movie) => {
    fetch(`http://localhost:5001/api/watchlist/${movie.tmdbId}`, {
      method: "DELETE",
    }).then(() => {
      setWatchlist((prev) => prev.filter((m) => m.tmdbId !== movie.tmdbId));
      toast.error(`${movie.title} has been removed from Watchlist`);
    });
  };

  const deleteFromHistory = (movie) => {
    fetch(`http://localhost:5001/api/history/${movie.tmdbId}`, {
      method: "DELETE",
    }).then(() => {
      setWatchHistory((prev) => prev.filter((m) => m.tmdbId !== movie.tmdbId));
      toast.error(`${movie.title} has been removed from Watch History`);
    });
  };

  useEffect(() => {
    loadHistory();
    loadWatchlist();
  }, [location.pathname]);

  return (
    <div>
      <NavBar />
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
      </Routes>
    </div>
  );
};
