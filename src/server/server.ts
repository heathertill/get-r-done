import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';

import * as http from 'http';
import * as socket from 'socket.io';

import './middleware/bearerstrategy';
import './middleware/localstrategy';

import routes from './routes';

const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

let p = path.join(__dirname, '../public');
console.log(p);


app.use(express.static(p));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

app.use(routes);

// const server = http.createServer(app);
// const io = socket(server);

// io.on('connection', () => {
//     console.log('a user is connected')
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
