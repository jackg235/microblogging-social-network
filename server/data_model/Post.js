const mongoose = require('mongoose');

// Post schema
const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    title: String,
    content: {type: String, maxlength: 200, minlength: 1},
    media: String, // not sure about this yet
    postDate: {type: Date, default: Date.now()},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const postModel = new mongoose.model('Post', postSchema);

module.exports = postModel