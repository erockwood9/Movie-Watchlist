import React, { useState, useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import * as bootstrap from "bootstrap";

const MovieCard = ({ movie, onMove, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );

    const tooltips = [...tooltipTriggerList].map(
      (el) => new bootstrap.Tooltip(el),
    );

    return () => {
      tooltips.forEach((tooltip) => tooltip.dispose());
    };
  }, [showDetails]);

  return (
    <>
      {/* Movie Card */}
      <div
        className="card"
        style={{ width: "13rem", cursor: "pointer" }}
        onClick={handleCardClick}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title={movie.title}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          className="card-img-top"
          alt={`${movie.title} poster`}
        />
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "400px", lineHeight: "40px" }}
          >
            <div
              className="modal-content bg-primary text-white position-relative"
              style={{ borderRadius: "10px" }}
            >
              {/* Header */}
              <div className="modal-header p-2">
                <h5 className="modal-title text-white">{movie.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  style={{ filter: "invert(1)" }}
                ></button>
              </div>
              {/* Body */}
              <div className="modal-body">
                <p>
                  <strong>Length:</strong> {movie.length_minutes} min
                </p>
                <p>
                  <strong>Rating:</strong> {movie.rating}
                </p>
                <p>
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  style={{ width: "200px" }}
                />
              </div>
              {/* Bottom right buttons */}
              <div className="position-absolute bottom-0 end-0 d-flex flex-column p-3">
                {onDelete && (
                  <button
                    className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center mb-2"
                    style={{ width: "40px", height: "40px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(movie);
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Delete Movie"
                  >
                    <i className="bi bi-trash fs-3"></i>
                  </button>
                )}
                {onMove && (
                  <button
                    className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(movie);
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Move To Watch History"
                  >
                    <i className="bi bi-arrow-right fs-4"></i>
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
