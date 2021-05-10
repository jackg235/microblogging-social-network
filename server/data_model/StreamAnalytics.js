const mongoose = require('mongoose');
// Stream analytics schema
const streamAnalyticsSchema = new mongoose.Schema({
    username: {type: String, required: true},
    roomName: {type: String, required: true},
    start: {type: Date, default: Date.now},
    end: {type: Date, default: null},
});

module.exports = mongoose.model('StreamAnalytics', streamAnalyticsSchema, 'streamAnalytics');