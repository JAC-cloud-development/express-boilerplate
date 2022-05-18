import { Router } from 'express';

import auth from './auth/index.js';
import users from "./users/index.js";

const router = new Router();

router.use('/login', auth);
router.use("/user", users);

export default router;