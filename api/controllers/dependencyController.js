const country = require('../modal/countryModal');
const state = require('../modal/stateModal');
const city = require('../modal/cityModal');



const getCountries = async(req, res) => {
    try{ 
        const country = await country.find()
        res.status(200).send({ success: true, msg: 'Countries Data', data: countries })

    } catch(error) {
       res.status(400).send({ success: false, msg: error.message })
    }
}


module.exports = {
    getCountries
}