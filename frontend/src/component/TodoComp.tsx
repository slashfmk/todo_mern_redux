import React from 'react';

import todoActions from "../store/actions/todoActions";
import {useDispatch} from "react-redux";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TodoProps {
    id: string;
    title: string;
    description: string;
    resolve: boolean;
}

const TodoComp= (props: TodoProps) => {

    const dispatch = useDispatch();

    const deleteIt = async() => {
        // @ts-ignore
        dispatch(todoActions.deleteTodo({
            id: props.id
        }));
    }

    const solveIt = async () => {
        // @ts-ignore
        dispatch(todoActions.updateTodo({
            id: props.id,
            resolve: !props.resolve
        }));
    }

    return (
        <div className={`TodoComp  ${props.resolve ? 'resolve': 'unresolve'}`}>
            <ToastContainer />
            <div> {props.title} | {props.description} |
                <button onClick={() => deleteIt()} className={'btn-delete'}>Delete</button>
                <button onClick={() => solveIt()} className={'btn-delete'}>{props.resolve ? 'Unresolve': 'resolve'}</button>
            </div>
        </div>
    );
}

export default TodoComp;