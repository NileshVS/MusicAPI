const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDel',  {useNewUrlParser: true, useUnifiedTopology:true})
.then( () => console.log('Connected to database'))
.catch( err => console.log(err.message));

let userSchema = mongoose.Schema({
    name: {type:String},
    date: {type: Date, default:Date.now}
});

let UserModel = mongoose.model('userMod', userSchema);

async function newUser(){
    let data= new UserModel({
        name: 'Kamal'
    });
    let result = await data.save();
    console.log(result);
}

async function allUsers(){
    let result = await UserModel.find()
                                .select(['name', 'date']);
    console.log(result);
}

async function deleteById(){
    let result = await UserModel.findByIdAndDelete('5d8b5d5d7ad32e1efc8a9c22');
    console.log(result);
}
// newUser();
// deleteById();
console.log('new users:');
allUsers();