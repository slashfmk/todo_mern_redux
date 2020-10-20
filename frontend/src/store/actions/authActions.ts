import {createAction} from "@reduxjs/toolkit";

const authCall = createAction('authCall');
const registerCall = createAction('registerCall')

export default {authCall, registerCall};