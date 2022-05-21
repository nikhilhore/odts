const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    specialCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Code = new mongoose.model('Code', codeSchema);
module.exports = Code;