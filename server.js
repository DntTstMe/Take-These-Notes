// Import required modules
const express = require('express');  // Import the Express framework
const path = require('path');        // Import the 'path' module for working with file paths
const apiRoutes = require('./routes/apiRoutes');  // Import the API routes
const htmlRoutes = require('./routes/htmlRoutes');  // Import the HTML routes

// Create an Express application
const app = express();

// Define the port number that the server will listen on
const PORT = 3001;

// Middleware Setup
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(express.json());  // Parse JSON data from request bodies
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the 'public' directory

// Mount API routes under the /api path
app.use('/api', apiRoutes);

// Mount HTML routes under the root path
app.use('/', htmlRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});
