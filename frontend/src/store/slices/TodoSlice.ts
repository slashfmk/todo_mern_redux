import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const todoSlice: any = createSlice({

    name: "todoSlice",
    initialState: {
        loading: false,
        list: [],
        error: null
    },

    reducers: {
        initTodo: (state, action) => {
                state.loading = true;
        },

        loadTodoSuccess: (state, action) => {
            state.loading = false;
            state.list = action.payload;
            state.error = null;
        },

        loadTodoError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        unloadTodo: (state, action) => {
            state.loading = false;
            state.list = [];
            state.error = null;
        },

        /**
         * When submitting new Todo
         */

        createTodoSuccess: (state, action) => {
            toast.success(action.payload);
        },
        createTodoError: (state, action) => {
            toast.error(action.payload);
            state.error = action.payload;
        },

        /**
         * Delete todo
         */
        deleteTodoSuccess: (state, action) => {
            toast.success(action.payload);
        },
        deleteTodoError: (state, action) => {
            toast.error(action.payload);
            state.error = action.payload;
        },

        /**
         * When update a todo
         */
        updateTodoSuccess: (state, action) => {
            toast.success(action.payload);
            console.log(action.payload);
        },
        updateTodoError: (state, action) => {
            state.error = action.payload;
            toast.error(action.payload);
        }
    }
});


export default todoSlice.reducer;
export const {
    initTodo,
    loadTodoSuccess,
    loadTodoError,
    unloadTodo,
    createTodoError,
    createTodoSuccess,
    deleteTodoSuccess,
    deleteTodoError,
    updateTodoSuccess,
    updateTodoError
} = todoSlice.actions;