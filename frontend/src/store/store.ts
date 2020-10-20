import {configureStore, applyMiddleware} from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';
import rootReducer from "./rootReducer";
import TodoThunk from "./middlewares/TodoThunk";
import authThunk from "./middlewares/authThunk";
import usersThunk from "./middlewares/UsersThunk";

interface decoding {
    user_id: any,
    username: any,
    role: any
}

// Init values
let foundToken: any = null;
let userDecoded = null;


if (localStorage.getItem('token') !== null) {

    const savedToken = localStorage.getItem('token');
    // @ts-ignore
    const decodedData = jwtDecode(savedToken);

    userDecoded = {
        // @ts-ignore
        user_id: decodedData.id,
        // @ts-ignore
        username: decodedData.username,
        // @ts-ignore
        role: decodedData.role
    };

    foundToken = localStorage.getItem('token');
}

// @ts-ignore
const store = configureStore({
    reducer: rootReducer,
    // @ts-ignore
    middleware: [authThunk, usersThunk, TodoThunk],
    // @ts-ignore
    preloadedState: {
        auth: {
            user: userDecoded,
            token: foundToken
        }
    }
});

export default store;