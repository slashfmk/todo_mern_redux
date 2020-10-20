import {combineReducers} from "redux";
import todo from './slices/TodoSlice';
import auth from './slices/AuthSlice';
import users from './slices/UsersSlice';

const rootReducer = combineReducers({
    todo: todo,
    auth: auth,
    users: users
});

export default rootReducer;