// @flow
import React, {useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {TweenMax, Power4, Bounce, Elastic} from 'gsap';

import usersActions from '../store/actions/Users';

interface UserCardType {
    id: string;
    name: string;
    password: string;
    role: string;
}

const UserCard = (props: UserCardType) => {

    let container = useRef(null);
    let cardOption = useRef(null);
    let userCard = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
       TweenMax.from(userCard, .9, {opacity: 0, y: -25});
    }, []);

    const showOption = () => {
        TweenMax.to(cardOption, .8, {y: -160, ease: Power4.easeOut} );
    }

    const hideOption = () => {
        TweenMax.to(cardOption, .8, {y: 0, ease: Power4.easeOut});
    }

    const deleteUser = () => {
        // @ts-ignore
        dispatch(usersActions.deleteUser({user_id: props.id}));
    }


    return (
        <div className={'userCard'} ref={(el:any) => userCard = el} onMouseOver={() => showOption()} onMouseOut={() => hideOption()}>
            <div ref={(el:any) => container = el} className={'userCardContainer'}>
                <div className={'userCardName'}>Name: {props.name}</div>
                <div className={'userCardPassword'}>Password: {props.password}</div>
                <div className={'userCardRole'}>Assigned role: {props.role}</div>
            </div>

            <div ref={(el:any) => cardOption = el} className={'userCardOption'} >
                <button onClick={() => deleteUser()} className={'btn btn--action'} >Delete</button>
                <button className={'btn btn--action'} >Modified</button>
            </div>
        </div>
    );
};

export default UserCard;