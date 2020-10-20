import {createAction} from "@reduxjs/toolkit";

const loadTodos = createAction('loadTodos');
const addTodo = createAction('addTodo');
const deleteTodo = createAction('deleteTodo');
const updateTodo = createAction('updateTodo');

export default {loadTodos, addTodo, deleteTodo, updateTodo};