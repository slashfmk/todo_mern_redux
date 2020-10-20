const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const verifyAuthController = require('../controller/verifyAuthController');

router
    .route('/')
    .get(verifyAuthController.verifyToken, todoController.getTodos)
    .post(verifyAuthController.verifyToken, todoController.addTodo)
    .delete(verifyAuthController.verifyToken, verifyAuthController.verifyRole(["admin", "basic"]), todoController.deleteAllTodo);

router
    .route('/:id')
    .get(verifyAuthController.verifyToken, todoController.getTodoById)
    .patch(verifyAuthController.verifyToken, todoController.updateTodo)
    .delete(verifyAuthController.verifyToken, todoController.deleteTodo);

module.exports = router;