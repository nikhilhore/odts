const mongoose = require('mongoose');

const officeSchema = mongoose.Schema({
    officeId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    subDistrict: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const Office = new mongoose.model('Office', officeSchema);

module.exports = { Office };