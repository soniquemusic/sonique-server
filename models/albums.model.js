const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: {
        type: String,
        required: true,
        trim: true
    },
    file_url: {
        type: String,
        required: true
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;