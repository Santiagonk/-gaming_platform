const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');
const { config } = require('../config/config');
const pool = new Pool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    port: config.dbPort
});


//setting up our local strategy
passport.use('local', new LocalStrategy({passReqToCallBack: true}, async ( username, password, cb )=> {
    console.log("this is being executed");
    const response = await pool.query('SELECT * FROM users', [username]); //'SELECT id, username, password FROM users WHERE username=$1::text'
    console.log(response);
    // res.json({
    // message: 'User Add Succesfully',
    // body:{
    //     user: {username, password, email}
    //     }
    // });
}));

const getUsers =  async (req, res) =>{
    try {
        const response = await pool.query('SELECT * FROM users');
        res.status(200).json(response.rows);
    } catch(error){
        console.error(error);
    }
}

const getUsersById = async(req, res) => {
   try {
       const id  = req.params.id;
       const response = await pool.query('SELECT * FROM users WHERE id = $1', [id])
       res.json(response.rows).send("User ID " + req.params.id);
   } catch (error) {
    console.error(error);
   }
}

const createUser =  async (req, res) =>{
    try {
        const {name, username, password, email } = req.body;
        const response = await pool.query(' INSERT INTO users (name, username, password, email) VALUES ($1, $2, $3, $4)', [
            name,
            username,
            password,
            email]);
        console.log("User created");
        //  res.json({
        //      message: 'User Add Succesfully',
        //      body:{
        //          user: {name, username, password, email}
        //      }
        //  });
    } catch(error){
        console.error(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id  = req.params.id;
        pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.json(`User ${id} deleted succesfully`);
    } catch (error) {
        console.error(error);
    }
}

const updatedUser = async (req, res) => {
    try {
        const id  = req.params.id;
        const {name, username, password, email } = req.body;
        const response = await pool.query('UPDATE users SET name = $1, username = $2, password = $3, email = $4 WHERE id = $5', [
            name,
            username,
            password,
            email,
            id]);
         res.json('User updated')
    } catch (error) {
        console.error(error);
    }
}

const login = async (req, res) => {    
    try {
        const {username, password} = req.body;
        const response = await pool.query(' SELECT id, username, password FROM users WHERE username=$1::text', [username]);
        console.log(response);
        const passworduser= response.rows[0].password;
        if (passworduser === password){
            console.log('user login');
            res.json('user login');
        }else{
            console.log('failed in authentication');
            res.json('failed in authentication');
        }
    } catch(error){
        console.error(error);
    }
}

module.exports = {
    getUsers,
    createUser,
    getUsersById,
    deleteUser,
    login,
    updatedUser
}