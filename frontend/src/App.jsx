import React from "react";
import { Route, Routes, Link } from "react-router";
import { WatchlistPage } from "./pages/WatchlistPage";
import { SearchPage } from "./pages/SearchPage";
import { ReviewPage } from "./pages/ReviewPage";
import "bootswatch/dist/lux/bootstrap.min.css";
//import "./App.css";

export const App = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand">Movie-Watchlist</span>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              {/* Button to go to the homepage/watchlist */}
              <li className="nav-item" style={{ marginLeft: "449px" }}>
                <Link className="nav-link text-white" to="/">
                  My Watchlist
                </Link>
              </li>

              {/* Button to go to the search tab */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/search">
                  Movie Search
                </Link>
              </li>

              {/* Button to go to the reviews tab */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/review">
                  Reviews/Watched
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </div>
  );
};
