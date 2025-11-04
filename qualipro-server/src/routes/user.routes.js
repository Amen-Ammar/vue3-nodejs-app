const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/token.middleware');

router.post('/login', userController.login);
router.post('/refresh-token', [authMiddleware], userController.refreshToken);
router.post('/', [authMiddleware], userController.createUser);
router.get('/', [authMiddleware], userController.getUsers);
router.get('/:id', [authMiddleware], userController.getUser);
router.patch('/:id', [authMiddleware], userController.updateUser);
router.delete('/:id', [authMiddleware], userController.deleteUser);

module.exports = router;