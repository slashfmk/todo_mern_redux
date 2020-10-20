import React, {useState} from 'react';
import Nav from '../component/Nav';
import {useSelector} from "react-redux";

const Home: React.FC = (props: any) => {

    const userSelector = useSelector((state: any) => state.auth);

    return (
        <div>
            <Nav/>
            <h4>You are logged in as {userSelector.user ? userSelector.user.username : 'guest'}</h4>
            <h3>{userSelector.user && userSelector.user.user_id}</h3>
            <h3>{userSelector.user && userSelector.user.role}</h3>
            <h4>A Todo app to learn react as i am determined</h4>
        </div>
    )
}

export default Home;