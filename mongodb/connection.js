const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Connection to DB not established', err.message));

let userSchema = new mongoose.Schema({
    name: {type:String},
    age:{type:Number},
    date:{type: Date, default: Date.now},
    isAvailable: {type: Boolean}
});

let UserModel = new mongoose.model('user', userSchema);

async function newUser(){
    let data = new UserModel({
        name: 'Shashank',
        age: 24,
        isAvailable: true
    });

    let result= await data.save();
    console.log(result);
}

async function readAllData(){
    let result = await UserModel.find();
    console.log(result);
}

async function deleteUser(){
    let result= await UserModel.findByIdandDelete('5d8a551943da7a18d489ccef');
}
// newUser();
deleteUser();
readAllData();