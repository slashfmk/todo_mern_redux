import {createSlice} from "@reduxjs/toolkit";
import {toast} from 'react-toastify';

const userSlice = createSlice({

    name: "usersSlice",
    initialState:
        {
            loading: false,
            list: [],
            error: null
        },
    reducers: {

        initUsers: (state, action) => {
            state.loading = true;
        },
        usersSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload;
            state.error = null;
        },
        userError: (state, action) => {
            state.loading = false;
            state.list = [];
            state.error = action.payload;
        },

        userUnload: (state, action) => {
            state.loading = false;
            state.list = [];
            state.error = null;
        },
        deleteSuccess: (state, action) => {
            toast.success(action.payload.message);
        },
        deleteError: (state, action) => {
            toast.error("User not deleted!");
        }

    }
});

export default userSlice.reducer;
export const {initUsers, usersSuccess, userError, userUnload, deleteSuccess, deleteError} = userSlice.actions;

