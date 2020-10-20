const pool = require('../db/db_config');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {

    // check token
    const token = req.header('x-auth-token');

    if(!token) return next('access denied');

    try{

       // check if user still exists
       //  await pool.query('select * from users where use_id = $1', [await jwt.verify(token, process.env.JWT_SECRET).id], (error, response) => {
       //          if(error) return next(error);
       //          if(response.rows.length === 0) return next('user no longer exists');
       //  });

       // console.log(`${jwt.decode(req.user)} test deconding token`);

        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
       // console.log(req.user);
        next();

    }catch (e) {
        next('Invalid token');
    }
}

module.exports.verifyRole = (role) => {
    return async(req, res, next) => {
        if(!role.includes(req.user.role)) return next('You do not have the appropriate role for this page');
        next();
    }
};