// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Listing } from './types'; // Import the interface

function App() {
  const [listings, setListings] = useState<Listing[]>([]); // Use the interface

  // Fetch the listings from the server
  useEffect(() => {
    fetch('/api/listings')
      .then(response => response.json())
      .then((data: Listing[]) => { // Typecast to Listing[]
        setListings(data); // Set the fetched data
      })
      .catch(error => console.error("Failed to fetch listings:", error));
  }, []);
  

  // Render the listings as cards on the page
  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN Full Stack App</h1>
        <p>MongoDB + Express + React + Node.js</p>
        <h3>Made by Noah Hicks</h3>
      </header>
      <div className="listings">
        {listings.map(listing => (
          <div key={listing._id} className="card">
            <h2>{listing.name}</h2>
            <p>Beds: {listing.beds}</p>
            <p>Price: ${listing.price.$numberDecimal}</p>
            <p>Bathrooms: {listing.bathrooms.$numberDecimal}</p>
            <img src={listing.images.picture_url} alt={listing.name} className='card-img' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
