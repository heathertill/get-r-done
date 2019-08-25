import { Router } from 'express'
import queries from '../../db';

import { isAdmin } from '../../utils/routerMiddleware';

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        let tasks = await queries.Tasks.all();
        res.json(tasks);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});


// router.get('/:id?', isAdmin, async (req, res, next) => {
router.get('/:id?', async (req, res, next) => {
    let id = req.params.id
    try {
        let [task] = await queries.Tasks.one(id);
        res.json(task);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.post('/', async (req, res, next) => {
    let tasksBody = req.body;
    try {
        let newTask = await queries.Tasks.newTask(tasksBody);
        res.json(newTask)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.put('/:id', async (req, res, next) => {
    let tasksBody = req.body;
    let id = req.params.id;
    try {
        await queries.Tasks.updateTask(tasksBody, id)
        res.json({ message: 'Task updated!'})
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        await queries.Tasks.deleteTask(id);
        res.json({ message: 'Task deleted!' })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
});

export default router;