const mongoose = require('mongoose');

const stateSchame = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    country_short_name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('state', stateSchame);