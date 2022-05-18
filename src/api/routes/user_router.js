// require the express module
import { Router } from 'express';
import { createHashPassword, login } from '../auth/login.js';
import { controlObjectId } from "../../services/db/controlObjectId.js";
import {GetAllUsers, GetUserById, GetUserByUsername, PostNewUser, PutModifiedUserById, PutModifiedUserByUsername, DeleteUserById, DeleteUserByUsername, ChangePassword} from '../controllers/user_controller.js'
const router = new Router();

//middleware for auth
import { autenticateToken } from '../../services/jwt/index.js'

router.get("/getAll/", autenticateToken, GetAllUsers);

router.get("/getUserById/:ObjectId", autenticateToken, controlObjectId, GetUserById);

router.get("/getUserByUsername/:username", autenticateToken, GetUserByUsername);

router.post("/postNewUser/", autenticateToken, createHashPassword, PostNewUser);

router.put("/putModifiedUserById/:ObjectId", autenticateToken, controlObjectId, PutModifiedUserById);

router.put("/putModifiedUserByUsername/:username", autenticateToken, PutModifiedUserByUsername)

router.delete("/deleteUserById/:ObjectId", autenticateToken, controlObjectId, DeleteUserById);

router.delete("/deleteUserByUsername/:username", autenticateToken, DeleteUserByUsername);

router.put("/changePassword/", autenticateToken, createHashPassword, ChangePassword);

router.post("/login/", login);

export default router;