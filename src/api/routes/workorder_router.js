import { Router } from 'express';
import { controlDoubleObjectID } from '../../services/db/controlObjectId.js'
import { GetAllWorkorder, GetWorkorderById, PostNewWorkorder } from "../controllers/workorder_controller.js"
const router = Router();

router.get("/getAll/", GetAllWorkorder);

router.get("/getWorkorderById/:ObjectId", GetWorkorderById);

router.post("/postNewWorkorder/", controlDoubleObjectID, PostNewWorkorder);

export default router;
