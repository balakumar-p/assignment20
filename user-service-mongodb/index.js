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
// fetch by email
apis.get('/users/email/:email',(req,res)=>{
    dao.fetchByEmail(req.params.email,(err,data)=>{
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
// fetch by salary
apis.get('/users/salary/:salary',(req,res)=>{
    dao.fetchBySalaryGreater(req.params.salary,(err,data)=>{
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
// update the user
apis.put('/users/edit',(req,res)=>{
    dao.updateUser(req.body,(err,response)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to update the user',
                stackTrace: err
            });
        }else{
            res.status(200).json({
                message:'User updated successfully'
            });
        }
    });
});
// delete a user
apis.post('/users/delete',(req,res)=>{
    dao.deleteByName(req.body.name,(err,response)=>{
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
// fetch total salary of all the users
apis.get('/users/totalSalary',(req,res)=>{
    dao.fetchTotalSalary((err,data)=>{
        if(err){
            res.status(400).json({
                message: 'Unable to perform the aggregation',
                stackTrace: err
            });
        }else{
            res.status(200).json({
                message:'Total salary is',
                totalSalary: data
            });
        }
    });
});
// routes
server.use('/mongoose',apis);
// port
const port = 7861
server.listen(port,()=>{
    console.log(`Server started at ${port}`);
});