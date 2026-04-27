import React from "react";
import { Link, useLocation } from "react-router";

// Navigation bar with links to main pages
const NavBar = () => {
  const location = useLocation(); // Track current page

  // Apply orange outline to active link
  const isActive = (path) => location.pathname === path;
  const activeStyle = {
    borderBottom: "3px solid #FFC107",
    paddingBottom: "8px",
  };
  const linkHoverStyle = {
    transition: "all 0.3s ease",
  };
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
              <Link
                className="nav-link text-white"
                to="/"
                style={{
                  ...linkHoverStyle,
                  ...(isActive("/") ? activeStyle : {}),
                }}
                onMouseEnter={(e) =>
                  !isActive("/") && (e.target.style.opacity = "0.8")
                }
                onMouseLeave={(e) =>
                  !isActive("/") && (e.target.style.opacity = "1")
                }
              >
                My Watchlist
              </Link>
            </li>

            {/* Button to go to the watch history tab */}
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/history"
                style={{
                  ...linkHoverStyle,
                  ...(isActive("/history") ? activeStyle : {}),
                }}
                onMouseEnter={(e) =>
                  !isActive("/history") && (e.target.style.opacity = "0.8")
                }
                onMouseLeave={(e) =>
                  !isActive("/history") && (e.target.style.opacity = "1")
                }
              >
                Watch History
              </Link>
            </li>

            {/* Button to go to the search tab */}
            <li className="nav-item">
              <Link
                className="nav-link text-white"
                to="/search"
                style={{
                  ...linkHoverStyle,
                  ...(isActive("/search") ? activeStyle : {}),
                }}
                onMouseEnter={(e) =>
                  !isActive("/search") && (e.target.style.opacity = "0.8")
                }
                onMouseLeave={(e) =>
                  !isActive("/search") && (e.target.style.opacity = "1")
                }
              >
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
