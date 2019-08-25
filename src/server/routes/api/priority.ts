import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let priorities = await queries.Priority.getPriority();
        res.json(priorities);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let [priority] = await queries.Priority.getOnePriority(id);
        res.json(priority)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router