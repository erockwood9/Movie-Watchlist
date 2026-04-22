import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary sticky-top"
      data-bs-theme="dark"
      style={{ zIndex: "1030" }}
    >
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{
            fontSize: "1.75rem",
            marginLeft: "var(--bs-navbar-brand-margin-end)",
          }}
        >
          Movie-Watchlist
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav"
            style={{ marginLeft: "auto", marginRight: "0px !important" }}
          >
            {/* Button to go to the homepage/watchlist */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                My Watchlist
              </Link>
            </li>

            {/* Button to go to the watch history tab */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/history">
                Watch History
              </Link>
            </li>

            {/* Button to go to the search tab */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/search">
                Movie Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
