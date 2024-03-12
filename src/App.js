import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.error("Failed to fetch listings:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hey! This is my full stack app. I'm using React, Node.js, Express, and MongoDB.</p>
      </header>
      <div className="listings">
        {listings.map(listing => (
          <div key={listing._id} className="card">
            <h2>{listing.name}</h2>
            <p>Beds: {listing.beds}</p>
            <p>Price: ${listing.price}</p>
            <p>Bathrooms: {listing.bathrooms}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
