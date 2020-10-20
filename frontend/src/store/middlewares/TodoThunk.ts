import axios from 'axios';
import * as todoSlice from '../slices/TodoSlice';
import todoActions from "../actions/todoActions";
import constants from "../../util/constants";


// @ts-ignore
const TodoThunk = ({dispatch, getStore}) => next => async action => {

    switch (action.type) {
        case todoActions.loadTodos.type:
            next(action);

            try {
                const response: any = await axios.get(`${constants.APIBASEURL}/todos?timestamp=${new Date().getTime()}`, {});

                dispatch(todoSlice.initTodo());
                dispatch(todoSlice.loadTodoSuccess(response.data));
            } catch (e) {
                dispatch(todoSlice.loadTodoError(e));
            }
            break;

        // in case we add a new todo
        case todoActions.addTodo.type:
            next(action);
            try {
                const response: any = await axios.post(`${constants.APIBASEURL}/todos`,
                    {
                        title: action.payload.title,
                        description: action.payload.description
                    },
                    {});

                dispatch(todoSlice.createTodoSuccess(response.data.message));
                dispatch(todoActions.loadTodos());
            } catch (e) {
                dispatch(todoSlice.createTodoError(e.message));
            }
            break;

        case todoActions.deleteTodo.type:
            next(action);
            try {
                const response: any = await axios.delete(`${constants.APIBASEURL}/todos/${action.payload.id}`, {});
                dispatch(todoSlice.deleteTodoSuccess(response.data.message));
                dispatch(todoActions.loadTodos());
            } catch (e) {
                dispatch(todoSlice.deleteTodoError(e));
            }
            break;

        case todoActions.updateTodo.type:
            next(action);

            try {
                const response: any = await axios.patch(`${constants.APIBASEURL}/todos/${action.payload.id}`,
                    {resolve: action.payload.resolve}, {});
                dispatch(todoSlice.updateTodoSuccess(response.data.message));
                dispatch(todoActions.loadTodos());
            } catch (e) {
                dispatch(todoSlice.updateTodoError(e));
            }
            break;

        default:
            next(action);
            break;
    }

};

export default TodoThunk;