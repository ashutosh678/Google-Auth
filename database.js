const express= require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser')
const Schema = mongoose.Schema;

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema={
    name:String,
    last_name:String,
    email:String,
    domain:String
}



const User = mongoose.model('User',userSchema);



module.exports = User;