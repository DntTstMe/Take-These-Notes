// Import the 'path' module to handle file paths
const path = require('path');

// Import the 'express' module
const express = require('express');

// Create an instance of an Express router
const router = express.Router();

// Route to serve the 'notes.html' file when a client accesses '/notes'
router.get('/notes', (req, res) => {
    // Send the 'notes.html' file located in the 'public' directory
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

// Catch-all route to serve the 'index.html' file for any other requests
router.get('*', (req, res) => {
    // Send the 'index.html' file located in the 'public' directory
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Export the router for use in other modules
module.exports = router;
