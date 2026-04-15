import React from 'react';
import { Link } from 'react-router';

const NavBar = () => {
  return (
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
  );
};

export default NavBar;