import {createSlice} from "@reduxjs/toolkit";
import {toast} from 'react-toastify';

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        loading: false,
        user: null,
        error: null
    },

    reducers: {
        loggingInit: (state, action) => {
            state.loading =  true;
        },

        /*
        Login user
         */
        loggingSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            toast.success(action.payload.status);
        },

        loggingError: (state, action) => {
            localStorage.removeItem('token');
            state.loading = false;
            state.error = action.payload
            toast.error(action.payload.error.message);
        },

        /*
        Registering user
         */
        registerSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            toast.success(action.payload.status);
        },

        registerError: (state, action) => {
            localStorage.removeItem('token');
            state.loading = false;
            state.error = action.payload
            toast.error(action.payload.error.message);
        },

        logout: (state, action) => {
            localStorage.removeItem('token');
            state.loading = false;
            state.token = null;
            state.user = null;
        },
    }
});

export default AuthSlice.reducer;
export const {logout, loggingInit, loggingSuccess, loggingError, registerSuccess, registerError} = AuthSlice.actions;