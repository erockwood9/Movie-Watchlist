import Database from "better-sqlite3";

// creates file if it doesn't exist
const db = new Database("src/database.db");

// enable foreign keys
db.exec(`
  PRAGMA foreign_keys = ON;
`);

// Movies table
db.exec(`
CREATE TABLE IF NOT EXISTS Movies (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    poster_path TEXT,
    rating REAL,
    length_minutes INTEGER
)
`);

// WatchHistory table
db.exec(`
CREATE TABLE IF NOT EXISTS WatchHistory (
    id INTEGER PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES Movies(id)
)
`);

// Watchlist table
db.exec(`
CREATE TABLE IF NOT EXISTS Watchlist (
    id INTEGER PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES Movies(id)
)
`);

export default db;
