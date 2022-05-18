import { Router } from 'express';

import auth from './auth/index.js';
import users from "./users/index.js";
import workorders from "./workorders/index.js";
import delegate from "./delegate/index.js";

const router = new Router();

router.use('/login', auth);
router.use("/user", users);
router.use("/workorder", workorders);
router.use("/delegate", delegate);

export default router;