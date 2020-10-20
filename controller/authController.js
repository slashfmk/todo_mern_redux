
const jwt = require('jsonwebtoken');
const pool = require('../db/db_config');


const registerToken = (user) => {
    return jwt.sign({id: user.user_id, username: user.username, role: user.role}, process.env.JWT_SECRET);
}

module.exports.login = async (req, res, next) => {

    const {username, password} = req.body;
    if(!username || !password) return next('username or password field missing!');

    await pool.query('select user_id, username, role from users where username = $1 and password = $2', [username, password], (error, response) => {

        if(error) return next(error);
        if(response.rows.length === 0) return next('Invalid account or password');
       // if(response.rows.length === 0) return res.status(400).json({'error': 'unknown user'});

        const token = registerToken(response.rows[0]);

       // console.log(jwt.decode(token));
        console.log(token);

        res
            .header('x-auth-token', token)
            .header("access-control-expose-headers", "x-auth-token").json({
                user: response.rows[0],
                status: "successfully logged in!",
                token: token
        });
    });
}





