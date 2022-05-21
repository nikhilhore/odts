const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    tokenId: {
        type: String,
        required: true
    },
    expire_at: {
        type: Date,
        // expires: 259200,
        expires: new Date(Date.now() + 259200000),
        default: Date.now
    }
});

const Token = new mongoose.model('Token', tokenSchema);
module.exports = Token;