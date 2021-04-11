const mongoose = require('mongoose');

// Comment schema
const commentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    content: String,
    commentDate: {type: Date, default: Date.now()},
});

const commentModel = new mongoose.model('Comment', commentSchema);

module.exports = commentModel