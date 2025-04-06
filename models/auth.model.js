const mongoose = require('mongoose');

const soniqueSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: Number,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('sonique / user', soniqueSchema);

