const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.get('/callback', authController.handleOAuthCallback);
router.get('/login', authController.redirectToUpstox);

module.exports = router;
