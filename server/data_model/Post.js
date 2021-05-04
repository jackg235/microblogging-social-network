const mongoose = require('mongoose');
const mongo = require('mongodb')
// Post schema
const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    title: String,
    content: {type: String, maxlength: 200, minlength: 1},
    media: String, // not sure about this yet
    postDate: {type: Date, default: Date.now()},
    comments: [{
        id: String,
        username: String,
        content: String,
        date: {type: Date, default: Date.now()}
    }],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});
postSchema.index({username: 1}, {unique: false})

module.exports = mongoose.model('Post', postSchema, 'posts');