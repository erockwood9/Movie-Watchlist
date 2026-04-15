import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div
        className="movie-card"
        style={{ backgroundImage: `url(${movie.poster})` }}
        onClick={handleCardClick}
      >
        <div className="movie-title">{movie.title}</div>
      </div>

      {showDetails && (
        <div className="movie-details-overlay">
          <div className="movie-details">
            <button className="close-button" onClick={handleClose}>X</button>
            <h2>{movie.title}</h2>
            <p><strong>Length:</strong> {movie.length}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <img src={movie.poster} alt={`${movie.title} poster`} />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;