const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');
const uploader = require('../config/uploadsmiddlewaresong');

router.use(express.urlencoded({ extended: true }));
router.post('/create-song', uploader, songController.createSong);
router.get('/get-song', songController.getAllSongs);
router.delete('/delete-song/:id', songController.deleteSong);

module.exports = router;
