import * as express from 'express';

import { checkToken } from '../../utils/routerMiddleware';

import tasksRouter from './tasks';
import categoriesRouter from './categories';
import priorityRouter from './priority';
import usersRouter from './users';


const router = express.Router();

router.use(checkToken);

router.use('/tasks', tasksRouter);
router.use('/categories', categoriesRouter);
router.use('/priority', priorityRouter);
router.use('/users', usersRouter);

export default router;