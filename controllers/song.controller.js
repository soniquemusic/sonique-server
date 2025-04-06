const Song = require('../models/song.model');
const Author = require('../models/author.model');



const Upload = require("../config/upload");

exports.createSong = async (req, res) => {
    try {
        // Ensure the file fields are present
        if (!req.files || !req.files.songFile || !req.files.imageFile) {
            return res.status(400).send({ success: false, msg: "Both image/video and audio files are required." });
        }

        const imageFile = req.files.imageFile[0];  // Image file from the request
        const audioFile = req.files.songFile[0];   // Song file from the request

        // Check if both files are provided
        if (!imageFile || !audioFile) {
            return res.status(400).send({ success: false, msg: "Both image/video and audio files are required." });
        }

        console.log('Uploaded files:', req.files);

        // Extract body data
        const { sName, sLanguage, sAuthor, sAlbum, sDescription } = req.body;

        // Validate body fields
        if (!sName || !sLanguage || !sAuthor || !sAlbum || !sDescription) {
            return res.status(400).send({
                success: false,
                msg: "Missing required fields: sName, sLanguage, sAuthor, sAlbum, sDescription."
            });
        }

        // Upload image/video file (to Cloudinary or other storage)
        const imageUpload = await Upload.uploadFile(imageFile.path, 'auto');  // 'auto' for image/video
        // Upload audio file (MP3 format)
        const audioUpload = await Upload.uploadFile(audioFile.path, 'raw');   // 'raw' for audio

        // Store the song details in the database
        const store = new Song({
            sName,
            sLanguage,
            sAuthor,
            sAlbum,
            sDescription,
            file_url: imageUpload.secure_url,  // Store image/video URL
            audio_url: audioUpload.secure_url  // Store audio file URL
        });

        // Save the record to the database
        const record = await store.save();

        // Respond with the created song
        res.send({ success: true, msg: 'Files uploaded successfully!', data: record });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, msg: error.message });
    }
};

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find({}, 'sName sLanguage sAuthor sAlbum sDescription file_url audio_url');

        res.status(200).json({
            message: 'Songs fetched successfully',
            songs
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params; // Get the song ID from the URL parameters

        // Find the song by ID and delete it
        const song = await Song.findByIdAndDelete(id);

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({ message: 'Song deleted successfully', song });
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
