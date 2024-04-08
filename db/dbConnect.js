const express = require('express')
const db = express.Router();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Bhartendusingh:bhartendu@cluster0.9atxz.mongodb.net/tigerDatabase?retryWrites=true&w=majority');

mongoose.connection.on('connected', connected => {
    console.log('Connected with Database......')
});

mongoose.connection.on('error', err => {
    console.log('Connection failed')
});


module.exports = db;