import { Router } from 'express';
import { controlObjectId } from "../../services/db/controlObjectId.js";
import { GetAllTasks, GetTaskById, PostNewTask, DeleteTaskById } from "../controllers/task_controller.js"

const router = new Router();

//middleware for auth
import { autenticateToken } from '../../services/jwt/index.js'

router.get("/getAll/", autenticateToken, GetAllTasks);

router.get("/getTaskById/:ObjectId", autenticateToken, controlObjectId, GetTaskById);

router.post("/postNewTask/", autenticateToken, PostNewTask);

router.delete("/deleteTaskById/:ObjectId", autenticateToken, controlObjectId, DeleteTaskById);

export default router;