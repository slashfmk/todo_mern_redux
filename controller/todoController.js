
const pool = require('../db/db_config');


module.exports.getTodos = async (req, res, next) => {

    try {
        await pool.query('select * from todos where user_id = $1 order by todo_id', [req.user.id], (error, response) => {

            if (error) return next(error);

            console.log(req.user);

            res.status('200').json(response.rows);
        });

    } catch (e) {
        return next(e);
    }

}

module.exports.deleteAllTodo = async (req, res, next) => {

    const { id } = req.params;
    console.log(id);

    try {
        await pool.query('delete from todos where user_id = $1', [id], (error, response) => {

            if (error) return next(error);
            res.status('200').json({message: "All todos deleted successfully"});
        });
    } catch{
        return next(e);
    }
}

module.exports.getTodoById = async (req, res, next) => {

    const { id } = req.params;
    console.log(id);

    try {
        await pool.query('select * from todos where todo_id = $1 and user_id = $2', [id, req.user.id], (error, response) => {

            if (error) return next(error);
            res.status('200').json(response.rows);
        });
    } catch{
        return next(e);
    }

}

module.exports.deleteTodo = async (req, res, next) => {

    const { id } = req.params;
    console.log(id);

    try {
        await pool.query('delete from todos where todo_id = $1', [id], (error, response) => {

            if (error) return next(error);
            res.status('200').json({message: "todo deleted successfully"});
        });
    } catch{
        return next(e);
    }

}


module.exports.addTodo = async (req, res, next) => {

     const {title, description} = req.body;

    if(!title || !description) return next("Please fill out all field!");

     try{

         await pool.query('insert into todos (title, description, user_id) values ($1, $2, $3) returning *', [title, description, req.user.id], (error, response) => {
             if(error) return next(error);
             res.status(200).json({
                 message: `new todo saved successfully! `,
                 data: response.rows
             });
         });

     }catch (e) {
         return next(e.message);
     }
}

module.exports.updateTodo = async(req, res, next) => {

    const {id} = req.params;
    const resolving = req.body.resolve;

    try{
        await pool.query('update todos set resolve = $1 where todo_id= $2', [resolving, id], (error, response) => {
            if(error) next(error);
            res.status(200).json({message: `Todo has been set to ${resolving ? 'resolve' : 'unresolved'}!`});
        })
    } catch (e) {
        next(e);
    }

}