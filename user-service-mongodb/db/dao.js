const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fstmongosample');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id:{
        type: Number,
        required: [true,'Id cannot be left blank'],
        min: [1,'Id should be greater than 1'],
        max: [30,'Id should be lesser than 30']
    },
    name:{
        type: String,
        required:[true,'Name cannot be left blank']
    },
    email:{
        type: String,
        required:[true,'Email cannot be left blank'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Invalid Email Specified'] 
    },
    salary:{
        type: Number,
        required: false
    }
});
const UserModel = mongoose.model('user',UserSchema);

// fetch all
const fetchAll = (callback)=>{
    UserModel.find({},{__v:0},(err,data)=>{
        callback(err,data);
    });
}
// fetch by email
const fetchByEmail = (_email,callback)=>{
    UserModel.find({email: _email},{__v:0},(err,data)=>{
        callback(err,data);
    });
}
// fetch all users with salary greater than 
const fetchBySalaryGreater = (_salary,callback)=>{
    UserModel.find({salary: {$gte: _salary}},{__v:0},(err,data)=>{
        callback(err,data);
    });
}
// add a user
const addUser = (_u,callback)=>{
    const uObj = new UserModel({
        _id: _u._id,
        name: _u.name,
        email: _u.email,
        salary: _u.salary
    });
    UserModel.create(uObj,(err,response)=>{
        callback(err,response);
    });
}
// modify an existing user
const updateUser = (_u, callback)=>{
    UserModel.update({_id: _u._id },{name:_u.name,email:_u.email,salary:_u.salary},(err,response)=>{
        callback(err,response);
    });
}
// delete an existing user
const deleteByName = (_name,callback)=>{
    UserModel.deleteOne({name:_name},(err,response)=>{
        callback(err,response);
    });
}
// aggregate 
const fetchTotalSalary = (callback)=>{
    UserModel.aggregate([
        {
            "$match" : { }
        },
        {
            "$group":{ _id: 0, totalSalary: {$sum :"$salary" } }
        },
        {
            "$project":{
                _id: 0
            }
        }
    ],(err,data)=>{
        callback(err,data);
    });
}
module.exports={
    deleteByName,
    updateUser,
    addUser,
    fetchBySalaryGreater,
    fetchByEmail,
    fetchAll,
    fetchTotalSalary
}
