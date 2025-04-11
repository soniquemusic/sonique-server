const multer = require('multer');
const path = require('path');
const os = require('os');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploader = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
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
}).single('albumImage'); // Change here to use 'albumImage' field

module.exports = uploader;
