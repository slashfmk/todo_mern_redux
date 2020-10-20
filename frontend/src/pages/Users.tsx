// @flow
import React, {useState, Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCard from "../component/UserCard";
import Nav from '../component/Nav';

import userAction from '../store/actions/Users';

const Users: React.FC = (props) => {

    const usersSelector = useSelector((state: any) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction.loadUsers());
    }, []);

    return (
        <div className={'Users'}>
            <ToastContainer/>
            <Nav/>

            {usersSelector.loading ? <div> Loading users</div> :
                <Fragment>

                    <h5>There are {usersSelector.list.length} users in the database</h5>

                    {usersSelector.list.map((user: any) => <UserCard
                        id={user.user_id}
                        name={user.username}
                        password={user.password}
                        role={user.role}/>)
                    }

                </Fragment>
            }
        </div>
    );
};

export default Users;