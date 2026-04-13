const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Get the API key from environment variables.
function getApiKey() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not set. Add it to your environment.");
  }
  return apiKey;
}

// Make a request to the TMDB API and return parsed JSON.
async function fetchTmdb(path, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  const query = { ...params };

  // For each query parameter, append it to the URL endpoint
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  // Tmdb request takes two parameters: {URL endpoint, Authorization header (Essentially API key)}
  const response = await fetch(url.toString(), {
    headers: { Authorization: getApiKey() },
  });
  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

// Search TMDB for movies by text query.
export async function searchMovies(title) {
  if (!title) {
    throw new Error("Missing search query");
  }

  const result = await fetchTmdb("/search/movie", {
    query: title,
  });

  // Return only the fields we need in the app.
  return result.results.map((movie) => ({
    tmdbId: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    rating: movie.vote_average,
    release_date: movie.release_date,
  }));
}

// Fetch full movie details from TMDB by TMDB ID.
export async function getMovieDetails(tmdbId) {
  if (!tmdbId) {
    throw new Error("Missing tmdbId");
  }

  const movie = await fetchTmdb(`/movie/${tmdbId}`, {});
  return {
    tmdbId: movie.id,
    title: movie.title,
    description: movie.overview,
    poster_path: movie.poster_path,
    rating: movie.vote_average,
    length_minutes: movie.runtime,
    release_date: movie.release_date,
  };
}
