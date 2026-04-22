import Database from "better-sqlite3";

// Open the SQLite database file. This creates backend/src/database.db if it does not exist.
const db = new Database("src/database.db");
// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create Movies table to store movie metadata from TMDB.
db.exec(`
CREATE TABLE IF NOT EXISTS Movies (
  tmdbId INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  poster_path TEXT,
  rating REAL,
  length_minutes INTEGER,
  release_date TEXT
)
`);

// Create Watchlist table that references a saved movie.
db.exec(`
CREATE TABLE IF NOT EXISTS Watchlist (
  movie_id INTEGER PRIMARY KEY,
  FOREIGN KEY (movie_id) REFERENCES Movies(tmdbId) ON DELETE CASCADE
)
`);

// Create WatchHistory table where each row records a movie that was watched.
db.exec(`
CREATE TABLE IF NOT EXISTS WatchHistory (
  movie_id INTEGER PRIMARY KEY,
  FOREIGN KEY (movie_id) REFERENCES Movies(tmdbId) ON DELETE CASCADE
)
`);

// Prepared SQL statement used to insert a movie.
const insertMovie = db.prepare(`
  INSERT INTO Movies (tmdbId, title, description, poster_path, rating, length_minutes, release_date)
  VALUES (@tmdbId, @title, @description, @poster_path, @rating, @length_minutes, @release_date)
`);

// Prepared SQL statement used to update movie details if the movie already exists.
const updateMovie = db.prepare(`
  UPDATE Movies
  SET title = @title,
      description = @description,
      poster_path = @poster_path,
      rating = @rating,
      length_minutes = @length_minutes,
      release_date = @release_date
  WHERE tmdbId = @tmdbId
`);

// Query to find a movie by its TMDB id.
const selectMovieByTmdbId = db.prepare(`SELECT * FROM Movies WHERE tmdbId = ?`);
const selectMovieById = db.prepare(`SELECT * FROM Movies WHERE tmdbId = ?`);
const searchMoviesByTitle = db.prepare(
  `SELECT * FROM Movies WHERE title LIKE ? ORDER BY title`,
);

// Query to return watchlist rows joined with their movie data.
const selectWatchlist = db.prepare(`
  SELECT m.*
  FROM Watchlist w
  JOIN Movies m ON w.movie_id = m.tmdbId
`);

// Query to return history rows joined with their movie data.
const selectWatchHistory = db.prepare(`
  SELECT m.*
  FROM WatchHistory h
  JOIN Movies m ON h.movie_id = m.tmdbId
`);

// Insert a movie into the watchlist if it is not already there.
const insertWatchlist = db.prepare(
  `INSERT OR IGNORE INTO Watchlist (movie_id) VALUES (?)`,
);
const deleteWatchlist = db.prepare(`DELETE FROM Watchlist WHERE movie_id = ?`);
const insertWatchHistory = db.prepare(
  `INSERT INTO WatchHistory (movie_id) VALUES (?)`,
);
const deleteWatchHistory = db.prepare(
  `DELETE FROM WatchHistory WHERE movie_id = ?`,
);

// Find a local movie row by its TMDB id.
function findMovieByTmdbId(tmdbId) {
  return selectMovieByTmdbId.get(tmdbId);
}

// Search local movie titles using a LIKE query.
function searchLocalMovies(query) {
  return searchMoviesByTitle.all(`%${query}%`);
}

// Save movie details locally or update them if the movie already exists.
function createOrUpdateMovie(movie) {
  const existing = findMovieByTmdbId(movie.id);
  if (existing) {
    updateMovie.run(movie);
    return { ...existing, ...movie };
  }
  const result = insertMovie.run(movie);
  return findMovieByTmdbId(result.lastInsertRowid);
}

// Return all watchlist items with movie details.
function listWatchlist() {
  return selectWatchlist.all();
}

// Add a movie to watchlist by local movie id.
function addMovieToWatchlist(movieId) {
  const existing = selectWatchlist.all().find(w => w.tmdbId === movieId);
  if (existing) {
    return false; // already in watchlist
  }
  insertWatchlist.run(movieId);
  return true; // added
}

// Remove a movie from watchlist by local movie id.
function removeMovieFromWatchlist(movieId) {
  deleteWatchlist.run(movieId);
}

// Return all watch history items with movie details.
function listWatchHistory() {
  return selectWatchHistory.all();
}

// Add a movie to history with optional watched time and notes.
function addMovieToHistory(movieId) {
  insertWatchHistory.run(movieId);
  return listWatchHistory();
}

// Remove a movie from watch history by local movie id.
function removeMovieFromHistory(movieId) {
  deleteWatchHistory.run(movieId);
}

export default db;
export {
  findMovieByTmdbId,
  createOrUpdateMovie,
  searchLocalMovies,
  listWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  listWatchHistory,
  addMovieToHistory,
  removeMovieFromHistory,
};
