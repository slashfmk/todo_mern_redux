import axios from 'axios';
import constants from "../../util/constants";
import * as authSlice from '../slices/AuthSlice';
import * as todoASlice from "../slices/TodoSlice";

// @ts-ignore
const authThunk = ({dispatch, getState}) => next => async action => {

    // Call api
    switch (action.type) {

        case "authCall":

            next(action);
            try {
                // Resolved: dispatch success
                const response: any = await axios.post(`${constants.APIBASEURL}/auth/`,
                    {
                        username: action.payload.username,
                        password: action.payload.password
                    });

                dispatch(authSlice.loggingInit({}));
                dispatch(authSlice.loggingSuccess(response.data));
            } catch (e) {

                // Rejected: dispatch error
                dispatch(authSlice.loggingError({error: e}));
                dispatch(authSlice.logout({}));
                dispatch(todoASlice.unloadTodo());
            }

            break;

        case "registerCall":
            next(action);

            try {
                // Resolved: dispatch success
                const response: any = await axios.post(`${constants.APIBASEURL}/users/`,
                    {
                        username: action.payload.username,
                        password: action.payload.password
                    });

                dispatch(authSlice.loggingInit({}));
                dispatch(authSlice.registerSuccess(response.data));
            } catch (e) {
                // Rejected: dispatch error
                dispatch(authSlice.registerError({error: e}));
                dispatch(authSlice.logout({}));
                dispatch(todoASlice.unloadTodo());
            }

            break;

        default:
            next(action);
            break;
    }

}

export default authThunk;