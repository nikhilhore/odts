const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    documentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    publicUrl: {
        type: String,
        required: true
    },
    offices: {
        type: Array,
        required: false
    }
});

const Document = new mongoose.model('Document', documentSchema);
module.exports = Document;