import React, {Fragment, useEffect} from 'react';
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import TodoActions from '../store/actions/todoActions';

import Nav from '../component/Nav';
import TodoComp from "../component/TodoComp";
import todoActions from "../store/actions/todoActions";


interface TodoInterface {
    id: string;
    todo_id: string;
    title: string;
    description: string;
    resolve: boolean
}

const TodoPage: React.FC = (props) => {

    //redux
    const dispatch = useDispatch();
    const todoSelector = useSelector((state: any) => state.todo);
    const authSelector = useSelector((state: any) => state.auth);

    useEffect(() => {

        if (!authSelector.user) {
            // @ts-ignore
            props.history.push('/');
        }

    }, [authSelector.user]);

    useEffect(() => {
        dispatch(TodoActions.loadTodos());
    }, []);

    useEffect(() => {

    }, [todoSelector.list]);


    const initialValues: any = {
        title: '',
        description: ''
    }

    const onSubmit = (values: any) => {
        // @ts-ignore
        dispatch(todoActions.addTodo({title: values.title, description: values.description}));
        values.title = ''
        values.description = '';
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Required!'),
        description: Yup.string().required('Des is required!')
    })

    return (
        <div>
            <ToastContainer/>
            <Nav/>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className={'Form'}>

                    <label>Title: </label>
                    <Field type={'text'} name={'title'}/>
                    <ErrorMessage name={'title'}/>


                    <label>Description: </label>
                    <Field type={'text'} name={'description'}/>
                    <ErrorMessage name={'description'}/>

                    <button className={'btn'} type={'submit'}>Save todo</button>
                </Form>
            </Formik>

            <div className={'TodoPage'}>
                {todoSelector.loading ?
                    <Fragment><h2>Loading todos ...</h2></Fragment> :
                    todoSelector.list.length === 0 ? <h2>No todo available</h2> :
                        <Fragment>
                            <h4>You have {todoSelector.list.length} todos</h4>
                            {todoSelector.list.map((item: TodoInterface) =>
                                <TodoComp
                                    key={item.todo_id}
                                    id={item.todo_id}
                                    title={item.title}
                                    description={item.description}
                                    resolve={item.resolve}/>
                            )}
                        </Fragment>
                }
            </div>
        </div>
    )
}

export default TodoPage;