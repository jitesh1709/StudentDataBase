var http = require('http');
// const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var port = process.env.PORT||8000;
var app = express();
var appRoutes = require('./routes/appRoutes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect('mongodb+srv://students:Control@123@trial-cluster-afqw3.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',appRoutes);

http.createServer(app).listen(port);

console.log("Running at",port);