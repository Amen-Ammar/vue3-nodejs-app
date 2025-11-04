const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const authMiddleware = require('../middlewares/token.middleware');

router.get('/', [authMiddleware], roleController.getRoles);

module.exports = router;