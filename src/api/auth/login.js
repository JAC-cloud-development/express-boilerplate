import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import Users from '../models/user_model.js';

//create hash password with bcypt and jsonwebtoken
async function createHashPassword(req, res, next) {
    //take username and password passed in request body
    const {username, password} = req.body;
    try {
        //generate salt
        const salt = await bcrypt.genSalt();
        //generate hash password adding salt
        const hashPassword = await bcrypt.hash(password, salt);
        const user = { name: username, password: hashPassword}
        //pass user obj to the next step
        req.user = user;
        console.log(req.user)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send("Something went wrong.")
    }
}

//login function
async function login(req, res) {
    const {username, password} = req.body;
    //search username in the DB
    const searchedUser = await Users.findOne({ username: username });
        if(searchedUser === null){
            return res.status(404),send("Not found.")
        }
    try {
        //compare password given from request to the one in DB (using bcrypt library)
        if(await bcrypt.compare(password, searchedUser.password)){
            console.log("Success");
            //generate and return its token
            const accessToken = await createToken({name: username, password})
            res.json({accessToken: accessToken})
        }else{
            res.send("Not Allowed.")
        }

    } catch (error) {
        res.send("Wrong")
    }
}

//create token
async function createToken(user){
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
    return accessToken;
}


export {login, createHashPassword}