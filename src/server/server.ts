import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';

import './middleware/bearerstrategy';
import './middleware/localstrategy';

import routes from './routes';

const app = express();

let p = path.join(__dirname, '../public');
console.log(p);

app.use(express.static(p));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

app.use(routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
