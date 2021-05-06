const mongoose = require('mongoose');

// Comment schema
const commentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    content: String,
    commentDate: {type: Date, default: Date.now},
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
});

// add third param below??
const commentModel = new mongoose.model('Comment', commentSchema);

module.exports = commentModel