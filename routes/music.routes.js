const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();


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



//GET all music
router.get('/allmusic', (req,res) => {
    res.send(musicLibrary);
});

//GET music by ID
router.get('/allmusic/:id',(req,res) => {
    let checkId = musicLibrary.find(item => item.id === parseInt(req.params.id));
    if(!checkId){
        res.status(403).send('Invalid Music ID, please check again :(');
    }
    else{
        res.send(checkId);
    }
});

//Add music using POST
router.post('/newmusic', (req,res) => {
    let result = ValidationError(req.body);
    if(result.error) {res.send(result.error.details[0].message)};
    // console.log(result);
    let newMusic = {
        id: musicLibrary.length + 1,
        albumName: req.body.albumName,
        genre: req.body.genre,
        singerName: req.body.singerName
    };
    musicLibrary.push(newMusic);
    res.send('Music added, please go to localhost:4040/api/music/allmusic to check the updated list');
});

//Update music using PUT
router.put('/updatemusic/:id',(req,res) => {
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
router.delete('/deletemusic/:id',(req,res) => {
    let checkId = musicLibrary.find(item => item.id === parseInt(req.params.id));
    if(!checkId){
        res.status(403).send('Invalid Music ID, please check :(');
    }
    else{
        let index= musicLibrary.indexOf(checkId);
        musicLibrary.splice(index,1);
        res.send('Music deleted, visit localhost:4040/api/music/allmusic to see the changes.');
    }
});


function ValidationError(message) {
    let Schema = Joi.object().keys({
        albumName: Joi.string().min(3).max(150).required(),
        genre: Joi.string().required(),
        singerName: Joi.string().required()
    });

    return Schema.validate(message);
}

module.exports = router;