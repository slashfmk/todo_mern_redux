import React, {Fragment, useEffect, useState} from 'react';
import Nav from "../component/Nav";
import {useDispatch, useSelector} from "react-redux";

import authActions from "../store/actions/authActions";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = (props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFilled, setIsFilled] = useState<boolean>(false);

    const authSelector: any = useSelector((state: any) => state.auth);
    const dispatch: any = useDispatch();

    useEffect(() => {
        if (authSelector.user) {
            // @ts-ignore
            window.location = '/';
        }
    }, [authSelector.user]);

    const submit = async (e: any) => {
        e.preventDefault();

        if (!password || !username) {
            setIsFilled(false);
            toast.error('empty field');

        } else {
            setIsFilled(true);

                // @ts-ignore
                dispatch(authActions.registerCall({
                    username: username,
                    password: password
                }));

        }
    }

    return (
        <Fragment>
            <ToastContainer/>
            <Nav/>

            <div className={'Login'}>
                <form className={'form'} onSubmit={(e) => submit(e)}>
                    <label>Username: </label> <input onChange={(e) => setUsername(e.target.value)} type={'text'}
                                                     placeholder={'Your username'}/>
                    <br/>
                    <label>Password: </label> <input onChange={(e) => setPassword(e.target.value)} type={'password'}
                                                     placeholder={'Your password'}/>
                    <br/>
                    <button className={'btn'}>Register</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Register;