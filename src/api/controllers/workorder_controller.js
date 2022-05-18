import Workorder from '../models/workorder_model.js';

async function GetAllWorkorder(req, res) {
    return res.json(await Workorder.find());
}

async function GetWorkorderById(req, res) {
    var element = await Workorder.findOne({ _id: req.params.ObjectId });
    return element ? res.json(element) : res.status(404).send("No element found.");
}

async function PostNewWorkorder(req, res) {
    return res.json(await Workorder.create({user_ID: req.body.ObjectIdUser, task_ID: req.body.ObjectIdTask}));
}

export { GetAllWorkorder, GetWorkorderById, PostNewWorkorder}