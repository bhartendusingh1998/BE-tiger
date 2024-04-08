const mongoose = require('mongoose');

const citySchame = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    state_name: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('city', citySchame)