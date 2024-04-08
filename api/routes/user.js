const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const User = require('../modal/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//SignUP
routes.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                error: err 
            })
        }else {
            const user = new User ({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                userType: req.body.userType
            })
            user.save()
            .then(result => {
                res.status(200).json({
                    new_user: result
                })
            }) 
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        }
    })
 });
 
 

 // SignIn
routes.post('/login', (req, res, next) => {
    try{
        User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    msg: 'user not exist'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(!result){
                    return res.status(401).json({
                        msg: 'Password matching fail'
                    })
                }
                if(result){
                    const token = jwt.sign({
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        userType: user.userType                  
                    },
                    'This is dummy tokenKey',
                    {
                        expiresIn: '24h'
                    }
                    );
                    res.status(200).json({
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        userType: user.userType,
                        token: token
                    })
                }
            })
        }) 
    } catch(err) {
       return res.status.status(417).json({error : err})
    }
})



// Forget Password









module.exports = routes;