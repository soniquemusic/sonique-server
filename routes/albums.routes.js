const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller');
const uploader = require('../config/uploadsmiddlewarealbum');

router.use(express.urlencoded({ extended: true }));
router.post('/create-album', uploader, albumController.createAlbum);
router.get('/get-album' , albumController.getAlbum);
router.delete('/delete-album/:id', albumController.deleteAlbum);
router.get('/albums', albumController.getAllAlbumsWithSongs);

module.exports = router;
