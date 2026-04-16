import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { WatchlistPage } from "./pages/WatchlistPage";
import { SearchPage } from "./pages/SearchPage";
import { WatchHisPage } from "./pages/WatchHisPage";
import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./components/NavBar";
import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";

export const App = () => {
  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      title: 'Inception',
      length: '2h 28m',
      director: 'Christopher Nolan',
      rating: 'PG-13',
      poster: 'https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
    }
  ]);

  const [watchHistory, setWatchHistory] = useState([]);

  const moveToHistory = (movie) => {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
    setWatchHistory([...watchHistory, movie]);
    toast.success(`${movie.title} has been moved to Watch History`);
  };
  const deleteFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
    toast.error(`${movie.title} has been deleted from your Watchlist`);
  };

  const deleteFromHistory = (movie) => {
    setWatchHistory(watchHistory.filter((m) => m.id !== movie.id));
    toast.error(`${movie.title} has been deleted from your Watch History`)
  };

  return (
    <div>
      <NavBar />
        <Toaster position="top-center" />
        <Routes>
        <Route path="/" element={<WatchlistPage watchlist={watchlist} moveToHistory={moveToHistory} onDelete={deleteFromWatchlist}/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<WatchHisPage watchHistory={watchHistory} onDelete={deleteFromHistory} />} />
      </Routes>
    </div>
  );
};