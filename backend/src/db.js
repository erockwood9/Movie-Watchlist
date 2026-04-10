import Database from "better-sqlite3";

// Open the SQLite database file. This creates backend/src/database.db if it does not exist.
const db = new Database("src/database.db");
// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create Movies table to store movie metadata from TMDB.
db.exec(`
CREATE TABLE IF NOT EXISTS Movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tmdb_id INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  poster_path TEXT,
  rating REAL,
  length_minutes INTEGER,
  release_date TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
`);

// Create Watchlist table that references a saved movie.
db.exec(`
CREATE TABLE IF NOT EXISTS Watchlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id INTEGER NOT NULL,
  added_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES Movies(id) ON DELETE CASCADE,
  UNIQUE (movie_id)
)
`);

// Create WatchHistory table where each row records a movie that was watched.
db.exec(`
CREATE TABLE IF NOT EXISTS WatchHistory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id INTEGER NOT NULL,
  watched_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (movie_id) REFERENCES Movies(id) ON DELETE CASCADE
)
`);

// Prepared SQL statement used to insert a movie.
const insertMovie = db.prepare(`
  INSERT INTO Movies (tmdb_id, title, description, poster_path, rating, length_minutes, release_date)
  VALUES (@tmdb_id, @title, @description, @poster_path, @rating, @length_minutes, @release_date)
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
  WHERE tmdb_id = @tmdb_id
`);

// Query to find a movie by its TMDB id.
const selectMovieByTmdbId = db.prepare(
  `SELECT * FROM Movies WHERE tmdb_id = ?`,
);
const selectMovieById = db.prepare(`SELECT * FROM Movies WHERE id = ?`);
const searchMoviesByTitle = db.prepare(
  `SELECT * FROM Movies WHERE title LIKE ? ORDER BY title`,
);

// Query to return watchlist rows joined with their movie data.
const selectWatchlist = db.prepare(`
  SELECT w.id AS watchlist_id, m.*, w.added_at
  FROM Watchlist w
  JOIN Movies m ON w.movie_id = m.id
  ORDER BY w.added_at DESC
`);

// Query to return history rows joined with their movie data.
const selectWatchHistory = db.prepare(`
  SELECT h.id AS history_id, m.*, h.watched_at, h.notes
  FROM WatchHistory h
  JOIN Movies m ON h.movie_id = m.id
  ORDER BY h.watched_at DESC
`);

// Insert a movie into the watchlist if it is not already there.
const insertWatchlist = db.prepare(
  `INSERT OR IGNORE INTO Watchlist (movie_id) VALUES (?)`,
);
const deleteWatchlist = db.prepare(`DELETE FROM Watchlist WHERE movie_id = ?`);
const insertWatchHistory = db.prepare(
  `INSERT INTO WatchHistory (movie_id, watched_at, notes) VALUES (?, ?, ?)`,
);
const deleteWatchHistory = db.prepare(
  `DELETE FROM WatchHistory WHERE movie_id = ?`,
);

// Find a local movie row by its TMDB id.
function findMovieByTmdbId(tmdbId) {
  return selectMovieByTmdbId.get(tmdbId);
}

// Find a local movie row by the local movie id.
function findMovieById(id) {
  return selectMovieById.get(id);
}

// Search local movie titles using a LIKE query.
function searchLocalMovies(query) {
  return searchMoviesByTitle.all(`%${query}%`);
}

// Save movie details locally or update them if the movie already exists.
function createOrUpdateMovie(movie) {
  const existing = findMovieByTmdbId(movie.tmdb_id);
  if (existing) {
    updateMovie.run(movie);
    return { ...existing, ...movie };
  }
  const result = insertMovie.run(movie);
  return findMovieById(result.lastInsertRowid);
}

// Return all watchlist items with movie details.
function listWatchlist() {
  return selectWatchlist.all();
}

// Add a movie to watchlist by local movie id.
function addMovieToWatchlist(movieId) {
  insertWatchlist.run(movieId);
  return listWatchlist();
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
function addMovieToHistory(movieId, watchedAt, notes = null) {
  insertWatchHistory.run(movieId, watchedAt || new Date().toISOString(), notes);
  return listWatchHistory();
}

// Remove a movie from watch history by local movie id.
function removeMovieFromHistory(movieId) {
  deleteWatchHistory.run(movieId);
}

export default db;
export {
  findMovieByTmdbId,
  findMovieById,
  createOrUpdateMovie,
  searchLocalMovies,
  listWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  listWatchHistory,
  addMovieToHistory,
  removeMovieFromHistory,
};
