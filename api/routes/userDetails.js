const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const UserDetails = require('../modal/userDetails');
const cloudinary = require('cloudinary').v2;
const { cloudinaryConfig } = ('multer-storage-cloudinary')
const fs = require('fs');
const multer = require('multer');
const userDetails = require('../modal/userDetails');
const uploadSingleFile = multer({ dest: 'uploads/' }).single('file');
const country = require('country-state-city').Country
const state = require('country-state-city').State
const city = require('country-state-city').City
const MongoClient = require('mongodb').MongoClient;

// console.log(country.getAllCountries())



// MongoClient.connect('mongodb://localhost:27017/', 
MongoClient.connect('mongodb://127.0.0.1:27017/dependent', (err, db) => {
    if (err) throw err;

    var dbo = db.db('dependent');


    var countriesBulk = dbo.collection('countries').initializeOrderedBulkOp();
    var countries = country.getAllCountries();
    countries.forEach(country => {
        countriesBulk.insert({ name: country.name, short_name: country.isoCode })
    });
    // countriesBulk.execute();
    console.log('countries inserted')


    var statesBulk = dbo.collection('states').initializeOrderedBulkOp();
    var states = state.getAllStates();
    states.forEach(state => {
        statesBulk.insert({ name: state.name, country_short_name: state.countryCode })
    });
    // statesBulk.execute();
    console.log('state inserted')


    var citiesBulk = dbo.collection('cities').initializeOrderedBulkOp();
    var cities = city.getAllCities();
    cities.forEach(city => {
        citiesBulk.insert({ name: city.name, state_name: city.stateCode })
    });
    // citiesBulk.execute();
    console.log('city inserted')

})



// Get API
routes.get('/details', (req, res, next) => {
    UserDetails.find()
        .then(result => {
            res.status(200).json({
                userDetails: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});



// Image upload
routes.post('/upload', function (req, res) {
    uploadSingleFile(req, res, function (err) {
        if (err && err.code == 'LIMIT_UNEXPECTED_FILE') {
            // An error occurred when uploading
            return res.status(412).json({ error: "Please provide file to upload" });
        }
        return res.status(200).json({ file: req.file });
    })
});

cloudinary.config({
    // cloud_name: 'doohesuzm',
    // api_key: '811268933547166',
    // api_secret: '-PNupOo-f5wfjqB7fTAOKiwirYs'
    cloud_name: 'dg1sngbz4',
    api_key: '276997716193579',
    api_secret: 'NKv1E8qpde4YmfEpXFylyVhQ6fA'
});



// Post API
routes.post('/details', (req, res, next) => {

    uploadSingleFile(req, res, function (err) {
        if (err && err.code == 'LIMIT_UNEXPECTED_FILE') {
            // An error occurred when uploading
            return res.status(412).json({ error: "Please provide file to upload" });
        }
        try {
            let imageUrl = "";
            if (req.file) {
                cloudinary.uploader.upload(req.file.path, (err, result) => {
                    imageUrl = result.secure_url
                    console.log(req.file.path)
                    // process.exit();
                    const userDetails = new UserDetails({
                        _id: new mongoose.Types.ObjectId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        fatherName: req.body.fatherName,
                        motherName: req.body.motherName,
                        dob: req.body.dob,
                        gender: req.body.gender,
                        email: req.body.email,
                        contectNo: req.body.contectNo,
                        address: req.body.address,
                        qualification: req.body.qualification,
                        image: imageUrl
                    })
                    userDetails.save()
                        .then(result => {
                            res.status(200).json({
                                new_userDetails: result
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        })
                });
            } else {
                const userDetails = new UserDetails({
                    _id: new mongoose.Types.ObjectId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    fatherName: req.body.fatherName,
                    motherName: req.body.motherName,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    email: req.body.email,
                    contectNo: req.body.contectNo,
                    address: req.body.address,
                    qualification: req.body.qualification,
                    image: imageUrl
                })
                userDetails.save()
                    .then(result => {
                        res.status(200).json({
                            new_userDetails: result
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        } catch (error) {
            console.log(error)
            return res.status(417).json({ error: error.message });
        } finally {
            if (req.file) {
                fs.unlink(req.file.path, (err) => { });
            }
        }
    })
});



// Delete API
routes.delete('/:id', (req, res, next) => {
    UserDetails.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});



// Put API
routes.put('/:id', (req, res, next) => {
    UserDetails.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fatherName: req.body.fatherName,
            motherName: req.body.motherName,
            dob: req.body.dob,
            gender: req.body.gender,
            email: req.body.email,
            contectNo: req.body.contectNo,
            address: req.body.address,
            qualification: req.body.qualification
        }
    })
        .then(result => {
            res.status(200).json({
                updated_userDetails: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});


// Search Filter API
// http://localhost:3000/userDetails/search/Bhartendu

routes.get('/search/:key', async (req, res) => {
    console.log(req.params.key)
    let data = await userDetails.find({
        "$or": [
            { "firstName": { $regex: req.params.key } }
        ]
    })
    console.log(data)
    res.send(data)
})


module.exports = routes;





// {
//     "fullName": "ab",
//     "lastName": "Singh"
//     "fatherName": "Gurumat singh",
//     "motherName": "Upasana singh",
//     "dob": "14/02/1998",
//     "gerder": "male",
//     "email": "ab2021@gmail.com",
//     "contectNo": 8171453282,
//     "address": "Aligarh",
//     "qualification": "B-Tech, Polytechnic"
// }