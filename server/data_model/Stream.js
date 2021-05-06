const mongoose = require('mongoose');

// Stream schema
let streamSchema = new mongoose.Schema({
    roomName: {type: String, required: true},
    host: {type: String, required: true}
});

module.exports = mongoose.model('Stream', streamSchema, 'streams')