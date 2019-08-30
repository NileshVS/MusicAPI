const express = require('express');
const app = express();

let musicLibrary= [{
    id:1,
    albumName: 'Starboy',
    genre:'Pop',
    singerName:'The Weekend'
},
{
    id:2,
    albumName: 'King Of My Castle',
    genre:'EDM',
    singerName:'Don Diablo'
},
{
    id:3,
    albumName: 'Magenta Riddim',
    genre:'EDM',
    singerName:'DJ Snake'
},
{
    id:4,
    albumName: 'Mi Gente',
    genre:'Hip-Hop',
    singerName:'J Balvin'
}
];

app.use(express.json());

//GET all music
app.get('/api/allmusic', (req,res) => {
    res.send(musicLibrary);
});

//GET music by ID
app.get('/api/musicbygenre/:id',(req,res) => {
    let checkId = musicLibrary.find(item => item.id === parseInt(req.params.id));
    if(!checkId){
        res.status(403).send('Invalid Music ID, please check :(');
    }
    else{
        res.send(checkId);
    }
});

//Add music using POST
app.post('/api/newmusic', (req,res) => {
    let newMusic = {
        id: musicLibrary.length + 1,
        albumName: req.body.albumName,
        genre: req.body.genre,
        singerName: req.body.singerName
    };
    musicLibrary.push(newMusic);
    res.send('Music added, please go to localhost:4040/api/allmusic to check the updated list');
});

//Update music using PUT
app.put('/api/updatemusicbyid/:id',(req,res) => {
    let checkId = musicLibrary.find(item => item.id === parseInt(req.params.id));
    if(!checkId){
        res.status(403).send('Invalid Music ID, please check :(');
    }
    else{
        checkId.albumName = req.body.albumName,
        checkId.genre = req.body.genre,
        checkId.singerName = req.body.singerName;
        res.send(checkId);
    }
});

//DELETE music 
app.delete('/api/deletemusicbyid/:id',(req,res) => {
    let checkId = musicLibrary.find(item => item.id === parseInt(req.params.id));
    if(!checkId){
        res.status(403).send('Invalid Music ID, please check :(');
    }
    else{
        let index= musicLibrary.indexOf(checkId);
        let data= musicLibrary.splice(index,1);
        res.send('Music deleted, visit localhost:4040/api/allmusic to see the changes.');
    }
});

app.listen(4040, () => console.log('Server is running at localhost:4040'));