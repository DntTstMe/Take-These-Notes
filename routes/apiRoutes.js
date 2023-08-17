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
async function writeNotesFile(data){
 try {
    const notes = await fs.writeFile(dbFilePath, JSON.stringify(data));
    return JSON.parse(notes);
    } catch (err) {
    throw new Error("Failed to read notes.");
    }
 }
// Route to get all notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await readNotesFile();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to add a new note
router.post('/notes', async (req, res) => {
    try {
        const jsonNotes = await readNotesFile();
        console.log(jsonNotes);
        const newNote = { ...req.body, id: Date.now().toString() };
        jsonNotes.push(newNote);
        console.log(jsonNotes);
        await writeNotesFile(jsonNotes);
        res.json(newNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a note by ID
router.delete('/notes/:id', async (req, res) => {
    try {
        let jsonNotes = await readNotesFile();
        jsonNotes = jsonNotes.filter(note => note.id !== req.params.id);
        await writeNotesFile(jsonNotes);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;