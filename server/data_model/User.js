const mongoose = require('mongoose');

// User schema
let userSchema = new mongoose.Schema({
    first: {type: String, required: true},
    last: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    registrationDate: {type: Date, default: Date.now()},
    following: [{type: String, ref: 'User'}],
    followers: [{type: String, ref: 'User'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    img:
        {
            data: Buffer,
            contentType: String
        }
});

userSchema.index({email: 1, username: 1}, {unique: true})

module.exports = mongoose.model('User', userSchema, 'users')