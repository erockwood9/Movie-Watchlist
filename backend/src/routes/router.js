import express from "express";
import {
  findMovieByTmdbId,
  createOrUpdateMovie,
  searchLocalMovies,
  listWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  listWatchHistory,
  addMovieToHistory,
  removeMovieFromHistory,
} from "../db.js";
import {
  searchMovies as searchTmdbMovies,
  getMovieDetails,
} from "../services/tmdb.js";

const router = express.Router();

// If a movie is not already in the local database, fetch it from TMDB and save it.
async function ensureLocalMovie(tmdbId) {
  const existing = findMovieByTmdbId(tmdbId);
  if (existing) return existing;

  const details = await getMovieDetails(tmdbId);
  return createOrUpdateMovie(details);
}

// Search movies on TMDB and also return locally saved movies that match the query.
router.get("/movies/search", async (req, res) => {
  const movieSearchName = String(req.query.query);

  try {
    const tmdbResults = await searchTmdbMovies(movieSearchName);
    const localMatches = searchLocalMovies(movieSearchName);
    return res.status(200).json({ tmdbResults, localMatches });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Return all movies currently in the watchlist.
router.get("/watchlist", (req, res) => {
  const watchlist = listWatchlist();
  res.status(200).json({ watchlist });
});

// Add a movie to the watchlist by TMDB id.
router.post("/watchlist", async (req, res) => {
  const tmdbId = Number(req.body.tmdbId);

  try {
    const movie = await ensureLocalMovie(tmdbId);
    addMovieToWatchlist(movie.id);
    return res.status(201).json({ movie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Remove a movie from the watchlist by TMDB id.
router.delete("/watchlist/:tmdbId", (req, res) => {
  const tmdbId = Number(req.params.tmdbId || 0);
  if (!tmdbId) {
    return res.status(400).json({ error: "Missing tmdbId in route parameter" });
  }

  const movie = findMovieByTmdbId(tmdbId);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found in local database" });
  }

  removeMovieFromWatchlist(movie.id);
  return res.status(204).send();
});

// Return all watched movies from history.
router.get("/history", (req, res) => {
  const history = listWatchHistory();
  res.status(200).json({ history });
});

// Add a watched movie to history by TMDB id.
router.post("/history", async (req, res) => {
  const tmdbId = Number(req.body.tmdbId || 0);
  const watchedAt = req.body.watchedAt ? String(req.body.watchedAt) : undefined;
  const notes = req.body.notes ? String(req.body.notes) : undefined;

  if (!tmdbId) {
    return res.status(400).json({ error: "Missing tmdbId in request body" });
  }

  try {
    const movie = await ensureLocalMovie(tmdbId);
    addMovieToHistory(movie.id, watchedAt, notes);
    return res.status(201).json({ movie });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Remove a movie from history by TMDB id.
router.delete("/history/:tmdbId", (req, res) => {
  const tmdbId = Number(req.params.tmdbId || 0);
  if (!tmdbId) {
    return res.status(400).json({ error: "Missing tmdbId in route parameter" });
  }

  const movie = findMovieByTmdbId(tmdbId);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found in local database" });
  }

  removeMovieFromHistory(movie.id);
  return res.status(204).send();
});

export default router;
