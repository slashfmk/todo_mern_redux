const pool = require('../db/db_config');
const jwt = require('jsonwebtoken');


module.exports.getUsers = async (req, res, next) => {

    try {
        await pool.query('select * from users', (error, response) => {

            if (error) return next(error);
            res.status('200').json(response.rows);
        });

    } catch (e) {
        return next(e);
    }

}

module.exports.getUserById = async (req, res, next) => {

    const {id} = req.params;
    // console.log(id);

    try {
        await pool.query('select * from users where user_id = $1', [id], (error, response) => {

            if (error) return next(error);
            res.status('200').json(response.rows);
        });
    } catch {
        return next(e);
    }

}

module.exports.deleteUser = async (req, res, next) => {
    const {id} = req.params;
    // console.log(id);

    try {
        await pool.query('delete from users where user_id = $1', [id], (error, response) => {

            if (error) return next(error);
            console.log(error);
            res.status('200').json({message: "user deleted successfully !"});
        });
    } catch {
        return next(e);
    }
}


module.exports.addUser = async (req, res, next) => {

    const {username, password} = req.body;

    console.log(req.body);
    if (!username || !password) return next("Please fill out all field!");

    try {

        const result = await pool.query('select * from users where username = $1', [username]);

        if (result.rows.length !== 0) return next(`The username ${username} is already taken!`);

        await pool.query('insert into users (username, password) values ($1, $2) returning *', [username, password], (error, response) => {

            if (error) return next(error);

            const jwtToken = jwt.sign(
                {
                    id: response.rows[0].user_id,
                    username: response.rows[0].username,
                    role: response.rows[0].role
                }, process.env.JWT_SECRET);

            res
                .header('x-auth-token', jwtToken)
                .header("access-control-expose-headers", "x-auth-token")
                .status(200).json({
                token: jwtToken,
                message: `new user saved successfully!`,
                user: {
                    id: response.rows[0].user_id,
                    username: response.rows[0].username,
                    role: response.rows[0].role
                }
            });
        });

    } catch (e) {
        return next(e.message);
    }
}