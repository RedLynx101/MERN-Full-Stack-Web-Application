// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Listing } from './types'; // Import the interface

function App() {
  const [listings, setListings] = useState<Listing[]>([]); // Use the interface

  useEffect(() => {
    fetch('/api/listings')
      .then(response => response.json())
      .then((data: Listing[]) => { // Typecast to Listing[]
        // Transform data if necessary (e.g., converting $numberDecimal)
        const transformedData = data.map(listing => ({
          ...listing,
          price: parseFloat(listing.price.$numberDecimal),
          bathrooms: parseFloat(listing.bathrooms.$numberDecimal),
          // Apply similar transformations for other DecimalFields
        }));
        setListings(transformedData);
      })
      .catch(error => console.error("Failed to fetch listings:", error));
  }, []);

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
            <p>Price: ${listing.price.toString()}</p>
            <p>Bathrooms: {listing.bathrooms.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
