const mongoose = require('mongoose');
const mongo = require('mongodb')
// Post analytics schema
const postAnalyticsSchema = new mongoose.Schema({
    username: {type: String, required: true},
    numPosts: {type: Number, default: 0},
    numComments: {type: Number, default: 0},
    mostRecentPostDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PostAnalytics', postAnalyticsSchema, 'postAnalytics');