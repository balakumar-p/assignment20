const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    // _id:{
        // type: Number,
        // required: [false,'Id cannot be left blank'],
        // min: [1,'Id should be greater than 1'],
        // max: [30,'Id should be lesser than 30']
    // },
    firstname:{
        type: String,
        required:[true,'FirstName cannot be left blank']
    },
    lastname:{
        type: String,
        required:[true,'lastName cannot be left blank']
    },
    email:{
        type: String,
        required:[true,'Email cannot be left blank'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid Email Specified'] 
    },
    ssoid:{
        type: String,
        required: true
    }
});
const UserModel = mongoose.model('user',UserSchema);

// fetch all
const fetchAll = (callback)=>{
    UserModel.find({},{__v:0},(err,data)=>{
        callback(err,data);
    });
}

// add a user
const addUser = (_u,callback)=>{
    const uObj = new UserModel({
       // _id: _u._id,
        firstname: _u.firstname,
        lastname: _u.lastname,
        email: _u.email,
        ssoid: _u.ssoid
    });
    UserModel.create(uObj,(err,response)=>{
        callback(err,response);
    });
}

module.exports={
    addUser,
    fetchAll
}
