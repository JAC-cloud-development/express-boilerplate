import { Router } from 'express';

import itemsCommesse from './commesse/index.js'
import users from './users/index.js'
import auth from './auth/index.js'
import validateJWT from '../services/jwt/index.js';

const router = new Router();

router.use('/commesse', itemsCommesse);
router.use('/users', users);
router.use('/', validateJWT, auth);

export default router;