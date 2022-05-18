import { Router } from 'express';

import items from './items/index.js'
import users from './users/index.js'
import auth from './auth/index.js'

const router = new Router();

router.use('/items', items);
router.use('/users', users);
router.use('/auth', auth);

export default router;
