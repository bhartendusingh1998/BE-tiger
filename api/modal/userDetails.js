const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    fatherName: String,
    motherName: String,
    dob: String,
    gender: String,
    email: String,
    contectNo: Number,
    address: String,
    qualification: String,
    image: String
})

module.exports = mongoose.model('userDetails', userDetailsSchema);





