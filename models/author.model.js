const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    auName: {
        type: String,
        required: true,
        trim: true
    },
    file_url: {
        type: String,
        required: true
    }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
