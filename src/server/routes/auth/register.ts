import * as express from 'express';

import queries from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let hash = HashPassword(req.body.password)
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }
        let result: any = await queries.Users.createUser(user);
        let token = await CreateToken({ userid: result });
        res.json({
            role: 'guest',
            userid: result[0],
            token
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;