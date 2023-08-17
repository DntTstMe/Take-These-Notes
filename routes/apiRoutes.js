const express = require('express');
const fs = require('fs').promises;  // Using promises for async file operations
const path = require('path');

const router = express.Router();
const dbFilePath = path.join(__dirname, '../db/db.json');

// Async function to read notes from the file
async function readNotesFile() {
    try {
        const notes = await fs.readFile(dbFilePath, 'utf8');
        return JSON.parse(notes);
    } catch (err) {
        throw new Error("Failed to read notes.");
    }
}