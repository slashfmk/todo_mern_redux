import {createAction} from "@reduxjs/toolkit";

const loadUsers = createAction('usersCall');
const deleteUser = createAction('deleteUser');
const blockUser = createAction('blockUser');

export default {loadUsers, deleteUser, blockUser};