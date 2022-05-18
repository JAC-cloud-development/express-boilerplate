import Workorder from '../models/workorder_model.js';
import _ from 'lodash'

async function GetAllWorkorder(req, res) {
    return res.json(await Workorder.find());
}

async function GetWorkorderById(req, res) {
    var element = await Workorder.findOne({ _id: req.params.ObjectId }).populate("user_ID").populate("task_ID");
    if(element){
        element = _.omit(JSON.parse(JSON.stringify(element)), "user_ID.password")
    }
    return element ? res.json(element) : res.status(404).send("No element found.");
}

async function PostNewWorkorder(req, res) {
    return res.json(await Workorder.create({user_ID: req.body.ObjectIdUser, task_ID: req.body.ObjectIdTask}));
}

async function DeleteWorkorderByTaskId(taskId) {
    const result = await Workorder.deleteOne({ task_ID: taskId });
    console.log(result.deletedCount > 0 ? result : "No element found.")
}

export { GetAllWorkorder, GetWorkorderById, PostNewWorkorder, DeleteWorkorderByTaskId}