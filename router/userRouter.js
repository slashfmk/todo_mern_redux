const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const verifyAuthController = require('../controller/verifyAuthController');

router
    .route('/')
    .get(verifyAuthController.verifyToken, verifyAuthController.verifyRole('admin'), userController.getUsers)
    .post(userController.addUser);

router
    .route('/:id')
    .get(verifyAuthController.verifyToken, verifyAuthController.verifyRole(['admin']), userController.getUserById)
    .delete(verifyAuthController.verifyToken, verifyAuthController.verifyRole(['admin']), userController.deleteUser);

module.exports = router;