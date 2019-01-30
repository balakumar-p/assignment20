const express = require('express');
const server = express();
const apis = express.Router();
const parser = require('body-parser');
const dao = require('./db/dao');
server.use(parser.json());
server.use(parser.urlencoded({extended:false}));

//status api
server.get('/status',(req,res)=>{
    res.status(200).json({
        message: 'User Service is up & running'
    });
});

// routes
apis.get('/users',(req,res)=>{
    dao.fetchAll((err,data)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to fetch the users',
                stackTrace: err 
            });
        }else{
            if(data.length>0){
                res.status(200).json({
                    message: 'Users received successfully',
                    users: data 
                });
            }else{
            res.status(200).json({
                message: 'No users found',
                users: data 
            });
        }
        }
    });
});


// add a user
apis.post('/users/add',(req,res)=>{
    dao.addUser(req.body,(err,response)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to add the user',
                stackTrace: err
            });
        }else{
            res.status(200).json({
                message:'User added successfully'
            });
        }
    });
});

// delete a user
apis.post('/users/delete',(req,res)=>{
    dao.deleteByName(req.body.firstname,(err,response)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to delete the user',
                stackTrace: err
            });
        }else{
            res.status(200).json({
                message:'User deleted successfully'
            });
        }
    });
});

// routes
server.use('/mongoose',apis);
// port
const port = 8090
server.listen(port,()=>{
    console.log(`Server started at ${port}`);
});