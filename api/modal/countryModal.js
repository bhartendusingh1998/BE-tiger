const mongoose = require('mongoose');


const countrySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    short_name: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('country', countrySchema);