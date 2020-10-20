
import axios from 'axios';
import {toast} from 'react-toastify';

const axiosDefault = () =>  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');

// @ts-ignore
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if(expectedError){
       // logger.log(error);
       // console.log(expectedError);
        toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
});


export default axiosDefault;