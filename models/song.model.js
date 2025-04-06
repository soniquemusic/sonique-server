const mongoose = require('mongoose');
const Author = require('./author.model');

const songSchema = new mongoose.Schema({
    sName: {
        type: String,
        required: true,
        trim: true
    },
    sDescription: {
        type: String,
        required: true,
        trim: true
    },
    sAuthor: {
        type: String,
        required: true
    },
    sAlbum: {
        type: String,
        required: true
    },
    sLanguage: {
        type: String,
        required: true,
        enum: ['English', 'Hindi', 'Spanish', 'French']
    },
    file_url: {
        type: String,
    },
    audio_url: {
        type: String
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;