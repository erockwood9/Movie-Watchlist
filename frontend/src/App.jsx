import React from "react";
import { Route, Routes, Link } from "react-router";
import { WatchlistPage } from "./pages/WatchlistPage";
import { SearchPage } from "./pages/SearchPage";
import { ReviewPage } from "./pages/ReviewPage";
import "bootswatch/dist/lux/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./components/NavBar";

export const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </div>
  );
};
