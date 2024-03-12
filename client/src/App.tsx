// Import statements
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home.tsx'; // Ensure this path is correct
import ChartsPage from './ChartsPage.tsx'; // Ensure this path is correct

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/charts">Charts</Link>
            </li>
          </ul>
        </nav>

        {/* Route Configuration */}
        <Routes>
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/" element={<Home />} />
        </Routes>

        <br />
        {/* Footer with Author that is centered */}
        <footer style={{ textAlign: 'center' }}>
          <h3>Made by Noah Hicks</h3>
        </footer>
      </div>
    </Router>
  );
}

export default App;
