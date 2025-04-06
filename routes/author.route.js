const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.controller');
const uploader = require('../config/uploadsmiddlewareauthor');

router.use(express.urlencoded({ extended: true }));

router.post('/create-author', uploader, authorController.createAuthor);
router.get('/get-authors', authorController.getAuthors);
router.get('/authors', authorController.getAllAuthorsWithSongs);
router.delete('/delete-author/:id', authorController.deleteAuthor); // Assuming you have this method in your controller


module.exports = router;    