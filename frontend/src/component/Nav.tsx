import React, {useEffect, useState, Fragment} from 'react';
import {NavLink, Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Nav: React.FC = (props) => {


    const authSelector = useSelector((state: any) => state.auth);
   // const todoSelector = useSelector(state => state.todo);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        setUsername(authSelector.user === null ? '' : authSelector.user.username);
    }, [])

    return (
        <div className={'Nav'}>
            <ul className={'Nav__list'}>
                <li><NavLink exact to={'/'}>Home</NavLink></li>
                {
                    !username &&
                        <Fragment>
                            <li><NavLink to={'/login'}>Log In</NavLink></li>
                            <li><NavLink to={'/register'}>Register</NavLink></li>
                        </Fragment>

                }

                {
                     username &&
                    <Fragment>
                        <li><NavLink to={'/todos'}>Todos</NavLink></li>
                        <li><NavLink to={'/profile'}>Profile</NavLink></li>
                        <li><NavLink to={'/users'}>Users</NavLink></li>
                        <li><NavLink to={'/logout'}>Logout</NavLink></li>
                        | {username}
                    </Fragment>

                }


            </ul>
        </div>
    )
}

export default Nav;