import { Router } from 'express';
// ROUTES
//task route
import task_router from './routes/task_router.js';
//user route
import user_router from './routes/user_router.js';
//workorder route
import workorder_router from './routes/workorder_router.js';

// CREATE ROUTER
const router = new Router();
//for tasks -> /tasks
router.use('/tasks', task_router);
//for users -> /users
router.use('/users', user_router);
//for workorder -> /workorder
router.use('/workorder', workorder_router);

// EXPORT ROUTER
export default router;
