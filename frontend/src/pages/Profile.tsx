import React, {Fragment, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import Nav from '../component/Nav';

const Profile: React.FC = (props) => {

    // Redux
    const dispatch = useDispatch();
    const authSelector = useSelector((state: any) => state.auth);

    useEffect(() => {
        if(!authSelector) {
            // @ts-ignore
            props.history.push('/');
        }
    }, [authSelector]);


    return(
        <Fragment>
            <Nav />
            <div className={'Profile'} >
                <h4>Username: {authSelector.user.username}</h4>
                <h4>Role: {authSelector.user.role}</h4>
            </div>
        </Fragment>

    )
}

export default Profile;