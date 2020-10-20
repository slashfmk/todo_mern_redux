
import axios from 'axios';
import usersAction from '../actions/Users';
import * as usersActions from '../slices/UsersSlice';
import constants from "../../util/constants";
// @ts-ignore
const usersThunk = ({dispatch}) => next => async action => {

    switch(action.type){
        case usersAction.loadUsers.type:
            next(action);
            try{
                const response:any = await axios.get(`${constants.APIBASEURL}/users/`, {});
                dispatch(usersActions.initUsers({}));
                dispatch(usersActions.usersSuccess(response.data));
            } catch (e) {
                dispatch(usersActions.userError(e.message));
            }

            break;

        case usersAction.deleteUser.type:
            next(action);
            try{
                const response:any = await axios.delete(`${constants.APIBASEURL}/users/${action.payload.user_id}`, {});
                dispatch(usersActions.deleteSuccess(response.data));
                dispatch(usersAction.loadUsers());
            }catch (e) {
                dispatch(usersActions.userError(e.message));
            }

        default:
            next(action);
            break;
    }
}

export default usersThunk;