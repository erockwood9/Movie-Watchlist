import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Search() {
  return <h2>Search Page</h2>
}
function Watchlist(){
  return <h2>Watchlist Page</h2>
}

function Reviews() {
  return <h2>Reviews / Watched Page</h2>
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <span className="navbar-brand">Movie-Watchlist</span>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/watchlist">
                  Watchlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/movie-search">
                  Movie Search
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/reviews">
                  Reviews/Watched
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie-search" element={<Search />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>
  )
}

export default App