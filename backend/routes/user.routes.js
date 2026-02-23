const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// Public auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Example protected route
router.get('/me', protect, userController.getCurrentUser);

module.exports = router;

