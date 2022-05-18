import { Router } from 'express';
import { controlObjectId } from "../../services/db/controlObjectId.js";
import { GetAllTasks, GetTaskById, PostNewTask, DeleteTaskById } from "../controllers/task_controller.js"

const router = new Router();


router.get("/getAll/", GetAllTasks);

router.get("/getTaskById/:ObjectId", controlObjectId, GetTaskById);

router.post("/postNewTask/", PostNewTask);

router.delete("/deleteTaskById/:ObjectId", controlObjectId, DeleteTaskById);

export default router;