import React, { useState, useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as bootstrap from "bootstrap";

// Card component displaying movie poster, opens modal with details
const MovieCard = ({ movie, onMove, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle details modal
  const handleCardClick = () => {
    setShowDetails(true);
  };

  // Close details modal
  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <>
      {/* Clickable card with movie poster - hover effect */}
      <div
        className="card h-100"
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          className="card-img-top"
          alt={`${movie.title} poster`}
        />
      </div>

      {/* Modal showing full movie details */}
      {showDetails && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
            style={{
              boxShadow: "none",
              marginTop: "49px)",
            }}
          >
            <div
              className="modal-content bg-primary text-white"
              style={{
                borderRadius: "10px",
                maxHeight: "90vh",
                overflowY: "hidden",
              }}
            >
              {/* Modal title and close button */}
              <div
                className="modal-header p-2 d-flex justify-content-center"
                style={{ position: "relative" }}
              >
                <h2 className="modal-title text-white text-center">
                  {movie.title}
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  style={{
                    filter: "invert(1)",
                    position: "absolute",
                    right: "10px",
                  }}
                ></button>
              </div>
              {/* Movie poster and details */}
              <div className="modal-body d-flex" style={{ gap: "20px" }}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ flex: "0 0 35%" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="img-fluid rounded"
                  />
                </div>
                <div
                  style={{
                    flex: "1",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <p>
                    <strong>Length:</strong> {movie.length_minutes} min
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.rating}
                  </p>
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Synopsis:</strong>
                  </p>
                  <p>{movie.description}</p>
                </div>
              </div>
              {/* Action buttons: delete and move to history */}
              <div className="modal-footer d-flex justify-content-end">
                {onDelete && (
                  <button
                    className="btn btn-danger me-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(movie);
                      handleClose();
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.filter = "brightness(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.filter = "brightness(1)")
                    }
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                )}
                {onMove && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(movie);
                      handleClose();
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.filter = "brightness(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.filter = "brightness(1)")
                    }
                  >
                    <i className="bi bi-arrow-right"></i> Move to History
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
