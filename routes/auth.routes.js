const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middlewares');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', authenticateToken, authController.userProfile);
router.post('/forgot-password', authController.forgetPassword);
router.post('/reset-password', authController.resetPassword);
router.put('/update-profile', authenticateToken, authController.updateUserProfile);
router.post("/change-password", authenticateToken, authController.changePassword);

module.exports = router;