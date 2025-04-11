const multer = require('multer');
const path = require('path');
const os = require('os');

// Updated multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Updated file filter to allow multiple file types (audio, image/video)
const uploader = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedExtensions = /jpeg|jpg|png|gif|mp4|avi|mp3|wav/;
        const allowedMimes = /image\/|video\/|audio\/mpeg|audio\/amr/;


        const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedMimes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('File type not allowed. Only images, videos, and mp3 are allowed.'));
        }
    }
}).fields([
    { name: 'songFile', maxCount: 1 },  // Handling song upload
    { name: 'imageFile', maxCount: 1 }  // Handling image/video upload
]);

module.exports = uploader;
