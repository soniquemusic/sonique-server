const soniquealbums = require('../models/albums.model');
const Upload = require("../config/upload");

exports.createAlbum = async (req, res) => {
    try {
        // Use the correct field name 'albumImage'
        if (!req.file) {
            return res.status(400).send({ success: false, msg: "Image file is required." });
        }

        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).send({ success: false, msg: "Image file is required." });
        }

        const { albumName } = req.body;
        if (!albumName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const imageUpload = await Upload.uploadFile(imageFile.path, 'auto');

        const store = new soniquealbums({
            albumName,
            file_url: imageUpload.secure_url
        });
        await store.save();
        res.status(201).json({ message: 'Album created successfully', data: store });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAlbum = async (req, res) => {
    try {
        const songs = await soniquealbums.find().populate('albumName', 'file_url');
        res.status(200).json({ message: 'Albums fetched successfully', songs });
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

exports.deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params; // Get the album ID from the URL parameters

        // Find the album by ID and delete it
        const album = await soniquealbums.findByIdAndDelete(id);

        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        res.status(200).json({ message: 'Album deleted successfully', album });
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}