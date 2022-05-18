// require the express module
import { Router } from 'express';
import { createHashPassword, login } from '../auth/login.js';
import { controlObjectId } from "../../services/db/controlObjectId.js";
import {GetAllUsers, GetUserById, GetUserByUsername, PostNewUser, PutModifiedUserById, PutModifiedUserByUsername, DeleteUserById, DeleteUserByUsername} from '../controllers/user_controller.js'
const router = new Router();

router.get("/getAll/", GetAllUsers);

router.get("/getUserById/:ObjectId", controlObjectId, GetUserById);

router.get("/getUserByUsername/:username", GetUserByUsername);

router.post("/postNewUser/", createHashPassword, PostNewUser);

router.put("/putModifiedUserById/:ObjectId", controlObjectId, PutModifiedUserById);

router.put("/putModifiedUserByUsername/:username", PutModifiedUserByUsername)

router.delete("/deleteUserById/:ObjectId", controlObjectId, DeleteUserById);

router.delete("/deleteUserByUsername/:username", DeleteUserByUsername);

router.post("/login/", login);

export default router;