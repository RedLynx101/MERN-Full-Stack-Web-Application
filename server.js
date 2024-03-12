const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Load environment variables from .env file
require('dotenv').config();


app.get('/', (req, res) => res.send('Hello World from the back-end!'));

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mern1.bsj6pls.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_NAME}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();
        // Send a ping to confirm a successful connection
        client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 
    catch (e) {
        console.error("Failed to connect to your deployment:", e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        client.close();
    }
}
run();

// Get a list of listings from the MongoDB database
app.get('/api/listings', async (req, res) => {
    try {
        const collection = client.db("sample_airbnb").collection("listingsAndReviews");
        const listings = await collection.find({}).limit(50).toArray();
        console.log(`Fetched 50 listings at ${new Date()}.`);

        // Add a record of the request to a log file
        const logData = `Request received at ${new Date()}: ${req.method} ${req.url} from ${req.ip}\n`;
        fs.appendFile('api_log.txt', logData, (err) => {
            if (err) {
            console.error("Failed to write to log file:", err);
            } else {
            console.log("Request logged successfully.");
            }
        });

        res.json(listings);
    } catch (error) {
        console.error("Failed to fetch listings:", error);
        res.status(500).json({ message: "Failed to fetch listings" });
    }
});



app.listen(port, () => console.log(`Server running on port ${port}`));


// ----------------- Connect to the PG database -----------------
// Connect to the PG database
// const { Pool } = require('pg');
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// Create a table/PG
// app.get('/customers', async (req, res) => {
//     try {
//     const { rows } = await pool.query('SELECT * FROM Customers');
//     res.json(rows);
//     } catch (err) {
//     res.status(500).send(err.message);
//     }
// });