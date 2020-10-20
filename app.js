const dotenv = require('dotenv');

dotenv.config({path: 'config.env'});

const express = require('express');
const app = express();

app.use(express.json());

const todoRoute = require('./router/todoRoute');
const userRoute = require('./router/userRouter');
const authRoute = require('./router/authRoute');


const baseApiUrl = '/api/v1';

app.use(`${baseApiUrl}/todos/`, todoRoute);
app.use(`${baseApiUrl}/users/`, userRoute);
app.use(`${baseApiUrl}/auth/`, authRoute);

app.use((req, res) => {
    return res.status('400').json({message: "Page Not found!!"});
});


app.use((error, req, res, next) => {
    return res.status(400).json({error: error});
});

app.listen('4000', () => console.log("Running server on port 4000"));