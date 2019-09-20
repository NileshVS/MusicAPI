const express = require('express');
const app = express();
const router = require('./routes/music.routes');
app.use(express.json());
app.use('/api/music/', router);
app.listen(4040, () => console.log('Server is running at localhost:4040'));