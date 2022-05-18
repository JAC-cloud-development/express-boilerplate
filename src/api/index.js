import { Router } from 'express';

import workorder from './workorder/index.js'
import users from './users/index.js'
import auth from './auth/index.js'

const router = new Router();

router.use('/workorder', workorder);
router.use('/users', users);
router.use('/auth', auth);

export default router;
