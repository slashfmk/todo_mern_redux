import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authActions from "../store/actions/authActions";

import Nav from '../component/Nav';


const Login: React.FC = (props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    // @ts-ignore
    const authSelector = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authSelector.user) {

            setTimeout(() => {
                // @ts-ignore
                window.location = '/';
            }, 1500);

        }
    }, [authSelector.user]);


    const submit = async (e: any) => {
        e.preventDefault();


        if (!password || !username) {
            toast.error('Please fill out all fields!');

        } else {
            // @ts-ignore
            dispatch(authActions.authCall({
                username: username,
                password: password,
            }));

        }
    }

    return (
        <Fragment>
            <ToastContainer/>
            <Nav/>


            <Fragment>

                <div className={'Login'}>
                    <form onSubmit={(e) => submit(e)} className={'form'}>
                        <label>Username: </label> <input onChange={(e) => setUsername(e.target.value)} type={'text'}
                                                         placeholder={'Your username'}/>
                        <br/>
                        <label>Password: </label> <input onChange={(e) => setPassword(e.target.value)} type={'password'}
                                                         placeholder={'Your password'}/>
                        <br/>
                        <button disabled={authSelector.loading} style={{backgroundColor: authSelector.loading && '#000'}} className={'btn'}>{authSelector.loading ? 'Logging you in ...!' : 'Log in'}</button>
                    </form>
                </div>


            </Fragment>

        </Fragment>
    )
}

export default Login;