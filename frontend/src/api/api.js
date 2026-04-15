const BASE_URL = "http://localhost:5001/api"; // Backend API

// Parse JSON responses and throw a readable error for non-OK status codes.
async function handleResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.error || response.statusText || "Request failed";
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Search TMDB and local movies by query string.
export async function searchMovies(query) {
  const url = new URL(`${BASE_URL}/movies/search`);
  url.searchParams.set("query", query);

  const response = await fetch(url.toString());
  return handleResponse(response);
}

// Fetch the current watchlist from the backend.
export async function getWatchlist() {
  const response = await fetch(`${BASE_URL}/watchlist`);
  return handleResponse(response);
}

// Add a movie to the watchlist using its TMDB id.
export async function addToWatchlist(tmdbId) {
  const response = await fetch(`${BASE_URL}/watchlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmdbId }),
  });
  return handleResponse(response);
}

// Remove a movie from the watchlist by TMDB id.
export async function removeFromWatchlist(tmdbId) {
  const response = await fetch(`${BASE_URL}/watchlist/${tmdbId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

// Fetch the watch history from the backend.
export async function getHistory() {
  const response = await fetch(`${BASE_URL}/history`);
  return handleResponse(response);
}

// Add a watched movie to history using its TMDB id.
export async function addToHistory(tmdbId) {
  const response = await fetch(`${BASE_URL}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tmdbId }),
  });
  return handleResponse(response);
}

// Remove a movie from history by TMDB id.
export async function removeFromHistory(tmdbId) {
  const response = await fetch(`${BASE_URL}/history/${tmdbId}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}
