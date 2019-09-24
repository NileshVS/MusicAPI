const express = require('express');
const app = express();
const router = require('./routes/music.routes');
// const middleware = require('./middleware/user');
const morgan= require('morgan');
const port = process.env.PORT || 4040;
const config= require('config');

if (config.get('host.mail') == 'development mode'){
    app.use(morgan('tiny'));
}

if(process.env.NODE_ENV == 'development'){
    console.log(`password: ${config.get('password')}`);
}

app.use(express.json());
// app.use((req,res,next) => {
//     console.log('Hello user');
//     next();
// });
// app.use(middleware);
app.use('/api/music/', router);
// console.log('mode:', config.get('host.mail'));
// console.log(`Node environment: ${process.env.NODE_ENV}`);
// console.log(`development mode : ${app.set('env')}`);
app.listen(port, () => console.log(`Server is running at localhost:${port}`));