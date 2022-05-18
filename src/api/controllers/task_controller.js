import Tasks from "../models/task_model.js"
import { DeleteWorkorderByTaskId } from "./workorder_controller.js"
//task: ID, name, description, status, expire_date, date_creation (automatic)

async function GetAllTasks(req, res) {
    return res.json(await Tasks.find());
}

async function GetTaskById(req, res) {
    var element = await Tasks.findOne({ _id: req.params.ObjectId });
    return element ? res.json(element) : res.status(404).send("No element found.");
}

async function PostNewTask(req, res) {
    console.log({name: req.body.name, description: req.body.description, task_status: req.body.task_status, expire_date: req.body.expire_date})
    return res.json(await Tasks.create({name: req.body.name, description: req.body.description, task_status: req.body.task_status, expire_date: req.body.expire_date}));
}

async function DeleteTaskById(req, res) {
    const result = await Tasks.deleteOne({ _id: req.params.ObjectId });
    DeleteWorkorderByTaskId(req.params.ObjectId);
    return result.deletedCount > 0 ? res.json(result) : res.status(404).send("No element found.");
}

export { GetAllTasks, GetTaskById, PostNewTask, DeleteTaskById}