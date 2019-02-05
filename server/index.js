const express = require('express');
const server = express();
const apis = express.Router();
const parser = require('body-parser');
server.use(parser.json());
server.use(parser.urlencoded({ extended: false }));
const mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://localhost:27017/user');
const Schema = mongoose.Schema;
var conn2 = mongoose.createConnection('mongodb://127.0.0.1:27017/files');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
let gfs = Grid(conn2.db);
const util = require('util')


// mongoose.connect('mongodb://127.0.0.1:27017/files');
// let conn = mongoose.connection;
// let multer = require('multer');
// let GridFsStorage = require('multer-gridfs-storage');
// let Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// let gfs = Grid(conn.db);


const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'FirstName cannot be left blank']
    },
    lastname: {
        type: String,
        required: [true, 'lastName cannot be left blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be left blank'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Specified']
    },
    ssoid: {
        type: String,
        required: true
    }
});

const UserModel = conn.model('user', UserSchema);

// fetch all
const fetchAll = (callback) => {
    UserModel.find({}, { __v: 0 }, (err, data) => {
        callback(err, data);
    });
}

// add a user
const addUser = (_u, callback) => {
    const uObj = new UserModel({
        firstname: _u.firstname,
        lastname: _u.lastname,
        email: _u.email,
        ssoid: _u.ssoid
    });
    UserModel.create(uObj, (err, response) => {
        callback(err, response);
    });
}

//status api
server.get('/status', (req, res) => {
    res.status(200).json({
        message: 'User Service is up & running'
    });
});

// routes
apis.get('/users', (req, res) => {
    fetchAll((err, data) => {
        if (err) {
            res.status(400).json({
                message: 'Unable to fetch the users',
                stackTrace: err
            });
        } else {
            if (data.length > 0) {
                res.status(200).json({
                    message: 'Users received successfully',
                    users: data
                });
            } else {
                res.status(200).json({
                    message: 'No users found',
                    users: data
                });
            }
        }
    });
});


// add a user
apis.post('/users/add', (req, res) => {
    addUser(req.body, (err, response) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Unable to add the user',
                stackTrace: err
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'User added successfully'
            });
        }
    });
});


// Setting up the storage element
let storage = GridFsStorage({
    gfs: gfs,
    
    filename: (req, file, cb) => {
    
        let date = Date.now();
        // The way you want to store your file in database
        cb(null, file.fieldname + '-' + date + '.');
    },

    // Additional Meta-data that you want to store
    metadata: function (req, file, cb) {
        console.log("meta ==>", file.originalname);
		
	
        //console.log( JSON.stringify(req))
        cb(null, { originalname: file.originalname, description: req.body.description });

    },
    root: 'ctFiles' // Root collection name
});

// Multer configuration for single file uploads
let upload = multer({

    onFileUploadStart: function (file) {
        console.log(file.fieldname + ' is starting ...')
    },
    onFileUploadData: function (file, data) {
        console.log(data.length + ' of ' + file.fieldname + ' arrived')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    },
    storage: storage,
}).single('file');

// Route for file upload
apis.post('/upload', (req, res) => {
   //console.log(req);
    upload(req, res, (err) => {
        console.log("");
		//console.log("gobi ==>", req.body);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }

        if (req.body.description) {
            res.json({ error_code: 0, error_desc: null, file_uploaded: true });
            console.log(req.body.description);
        }
        else {
            res.status(400);
            res.json({ error_code: 1, error_desc: null, file_uploaded: false });
        }
    });

});


// Downloading a single file
apis.get('/file/:filename', (req, res) => {
    gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
        if (!files || files.length === 0) {
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
});

// Route for getting all the files
apis.get('/files', (req, res) => {
    let filesData = [];
    let count = 0;
    gfs.collection('ctFiles'); // set the collection to look up into

    gfs.files.find({}).toArray((err, files) => {
        // Error checking
        if (!files || files.length === 0) {
            return res.status(204).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // Loop through all the files and fetch the necessary information
        files.forEach((file) => {
            filesData[count++] = {
                originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType,
                description: file.metadata.description
            }
        });
        res.json(filesData);
    });
});


// Downloading a single file
apis.get('/delete/:filename', (req, res, err) => {
    gfs.collection('ctFiles'); //set collection name to lookup into
    if (req.params.filename) {
        gfs.files.findOneAndDelete({ filename: req.params.filename })
            .then((docs) => {
                console.log(docs);
                if (docs.value) {
                    return res.json(docs).status(200);
                } else {
                    res.status(404)
                    return res.json();
                }
            }).catch((err) => {
                console.log(err);
                return res.status(500);
            })
    } else {
        return res.status(400);
    }
});



// Allows cross-origin domains to access this API
server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept,Content-Type, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});



// routes
server.use('/', apis);
// port
const port = 8090
server.listen(port, () => {
    console.log(`Server started at ${port}`);
});