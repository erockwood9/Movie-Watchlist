# Backend for Movie Watchlist

This backend is a small Express API that stores movie data locally in SQLite and uses The Movie DB (TMDB) to fetch movie details.

## How it works

- `backend/src/server.js` starts the Express server and mounts the API routes under `/api`.
- `backend/src/db.js` opens a local SQLite database and defines three tables:
  - `Movies` stores movie metadata from TMDB.
  - `Watchlist` stores movies the user wants to watch.
  - `WatchHistory` stores movies the user has watched.
- `backend/src/routes/router.js` defines API endpoints for:
  - searching movies
  - adding/removing movies from watchlist
  - adding/removing movies from watch history
  - returning the current watchlist and history
- `backend/src/services/tmdb.js` calls the TMDB API to search movies and fetch movie details.

## Environment setup

1. Create a `backend/.env` file.
2. Add your TMDB API key:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

3. Install dependencies in `backend/`:

```bash
cd backend
npm install
```

## Run the backend

Start the server with:

```bash
npm run dev
```

Then the API will be available at `http://localhost:5001/api`.

## Useful endpoints

- `GET /api/movies/search?q=movieTitle` - search TMDB for movies
- `GET /api/watchlist` - return saved watchlist movies
- `POST /api/watchlist` - add a movie to watchlist with body `{ "tmdbId": 12345 }`
- `DELETE /api/watchlist/:tmdbId` - remove a movie from watchlist
- `GET /api/history` - return saved watch history
- `POST /api/history` - add a watched movie with body `{ "tmdbId": 12345, "watchedAt": "2026-04-10T12:00:00.000Z" }`
- `DELETE /api/history/:tmdbId` - remove a movie from watch history

## Notes

- The backend saves TMDB movie details locally before adding to the watchlist or history.
- If a movie is already stored locally, it updates the saved details instead of duplicating it.
