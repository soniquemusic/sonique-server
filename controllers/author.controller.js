const soniqueAuthor = require('../models/author.model');
const soniqueSong = require('../models/song.model');

const Upload = require("../config/upload");

exports.createAuthor = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).send({ success: false, msg: "Image file is required." });
        }

        // Validate required fields
        const { auName } = req.body;
        if (!auName) {
            return res.status(400).json({ error: 'Author name is required.' });
        }

        // Assuming Upload.uploadFile is a utility that uploads files to cloud storage
        const imageUpload = await Upload.uploadFile(req.file.path, 'auto'); // Modify based on your upload service

        // Save author to database
        const newAuthor = new soniqueAuthor({
            auName,
            file_url: imageUpload.secure_url // Store the URL from the uploaded image
        });
        await newAuthor.save();

        res.status(201).json({ message: 'Author created successfully', data: newAuthor });
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAuthors = async (req, res) => {
    try {
        const authors = await soniqueAuthor.find();
        res.status(200).json({ message: 'Authors fetched successfully', authors });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllAuthorsWithSongs = async (req, res) => {
    try {
        // Fetch all authors from the database
        const authors = await soniqueAuthor.find();

        if (!authors.length) {
            return res.status(404).json({ error: 'No authors found' });
        }

        // Fetch songs for each author and map the result
        const authorsWithSongs = await Promise.all(authors.map(async (author) => {
            // Fetch the songs that belong to the author using the author's name (sAuthor field is a string here)
            const songs = await soniqueSong.find({ sAuthor: author.auName }).populate('sAuthor', 'auName');

            return { author, songs };
        }));

        // Respond with authors and their respective songs
        res.status(200).json({ message: 'Authors and songs fetched successfully', authorsWithSongs });

    } catch (error) {
        // If there's an error, send a 500 response
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params; // Get the author ID from the URL parameters

        // Find the author by ID and delete it
        const author = await soniqueAuthor.findByIdAndDelete(id);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({ message: 'Author deleted successfully', author });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

