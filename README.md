# Movie Watchlist

A full-stack web application for managing movies you want to watch and tracking movies you've already seen. Users can search for movies, add them to their watchlist, mark them as watched, and maintain a personal watch history.

## Prerequisites

- Node.js (recommended: v18 or higher)
- npm (comes with Node.js)

## Installation

Install dependencies for both the frontend and backend:

```bash
npm run install:all
```

This command installs all required packages inside the `frontend/` and `backend/` directories.

## Environment Setup

Create a `.env` file in the `backend/` directory with your TMDB API key:

```bash
cd backend
```

Create `.env`:

```
TMDB_API_KEY=your_tmdb_api_key_here
```

To get a TMDB API key:
1. Visit [themoviedb.org](https://www.themoviedb.org)
2. Create an account and go to Settings > API
3. Copy your API key and paste it into `.env`

## Running the Project

Start both the frontend and backend development servers:

```bash
npm run dev
```

This will run both services concurrently.

## Accessing the App

Once the servers are running, open your browser and go to:

```
http://localhost:5173
```

## Notes

```

```
