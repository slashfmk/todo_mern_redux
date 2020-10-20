import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import {logout} from '../store/slices/AuthSlice';
import {unloadTodo} from '../store/slices/TodoSlice';

const Logout: React.FC = (props: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout({}));
        dispatch(unloadTodo());
        props.history.push('/');
    },[]);

    return null
}

export default Logout;