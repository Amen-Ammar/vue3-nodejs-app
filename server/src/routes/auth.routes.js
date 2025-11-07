const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/token.middleware');

router.post('/login', userController.login);
router.post('/refresh-token', [authMiddleware], userController.refreshToken);

module.exports = router;