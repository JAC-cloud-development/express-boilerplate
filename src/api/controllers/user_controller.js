import Users from '../models/user_model.js';
import _ from 'lodash'

// user(username, name, surname, password, role)

//OK
async function GetAllUsers(req, res) {
    return res.json(_.map(await Users.find(), (user) => _.omit(JSON.parse(JSON.stringify(user)), 'password') ));
}

//OK
async function GetUserById(req, res) {
var element = await Users.findOne({ _id: req.params.ObjectId });
return element ? res.json(_.omit(JSON.parse(JSON.stringify(element)), "password")) : res.status(404).send("No element found.");
}

//OK
async function GetUserByUsername(req, res) {
    var element = await Users.findOne({ username: req.params.username });
    return element ? res.json(_.omit(JSON.parse(JSON.stringify(element)), "password")) : res.status(404).send("No element found.");
    }

//OK
async function PostNewUser(req, res) {
    return res.json(await Users.create({username: req.user.name, password: req.user.password,  role: req.body.role, name: req.body.name, surname: req.body.surname }));
}

//OK
async function PutModifiedUserById(req, res) {
    const element = await Users.findOne({ _id: req.params.ObjectId });
    if(element){
        element.set(req.body);
        await element.save();
    }
    
    return element ? res.json(element) : res.status(404).send("No element found.");
}

async function PutModifiedUserByUsername(req, res) {
    const element = await Users.findOne({ username: req.params.username });
    if(element){
        element.set(req.body)
        await element.save();
    }
    
    return element ? res.json(element) : res.status(404).send("No element found.");
}

async function DeleteUserById(req, res) {
    const result = await Users.deleteOne({ _id: req.params.ObjectId });
    return result.deletedCount > 0 ? res.json(result) : res.status(404).send("No element found.");
}

async function DeleteUserByUsername(req, res) {
    const result = await Users.deleteOne({ username: req.params.username });
    return result.deletedCount > 0 ? res.json(result) : res.status(404).send("No element found.");
}

//TODO
async function ChangePassword(req, res){
    const element = await Users.findOne({ username: req.params.username });
    if(element){
        element.set(req.body)
        await element.save();
    }
    
    return element ? res.json(element) : res.status(404).send("No element found.");
}

export {GetAllUsers, GetUserById, PostNewUser, PutModifiedUserById, DeleteUserById, GetUserByUsername, DeleteUserByUsername, PutModifiedUserByUsername}