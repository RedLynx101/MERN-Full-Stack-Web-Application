// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Listing } from './types'; // Import the interface


function Home() {
    const [listings, setListings] = useState<Listing[]>([]); // Use the interface

    const handleCardClick = (listing: Listing) => {
        setSelectedListing(listing);
    };
    
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

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
            <header className="App-header" style={{ backgroundImage: "url(/header.png)", backgroundSize: "cover", backgroundPosition: "center", color: "white" }}>
                <h1>MERN Full Stack App</h1>
                <p>MongoDB + Express + React + Node.js</p>
                <h3>Made by Noah Hicks</h3>
            </header> 

            <br />
            <h1>Listings</h1>

            <div className="listings">
                {listings.map(listing => (
                    <div key={listing._id} className="card" onClick={() => handleCardClick(listing)}>
                        <h2>{listing.name}</h2>
                        <p>Beds: {listing.beds}</p>
                        <p>Price: ${listing.price.$numberDecimal}</p>
                        <p>Bathrooms: {listing.bathrooms.$numberDecimal}</p>
                        <img src={listing.images.picture_url} alt={listing.name} className='card-img' />
                    </div>
                ))}
                {selectedListing && (
                    <div className="modal" style={{ display: 'block', opacity: 0.8 }}>
                        <img src={selectedListing.images.picture_url} alt={selectedListing.name} className='modal-img' />
                        <h2>{selectedListing.name}</h2>
                        <p>{selectedListing.summary}</p>
                        <p>Beds: {selectedListing.beds}</p>
                        <p>Price: ${selectedListing.price.$numberDecimal}</p>
                        <p>Bathrooms: {selectedListing.bathrooms.$numberDecimal}</p>
                        <p>Host: {selectedListing.host.host_name}</p>
                        <p>Location: {selectedListing.address.street}</p>
                        <p>Notes: {selectedListing.notes}</p>
                        <button onClick={() => setSelectedListing(null)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
