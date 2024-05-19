const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    totalDistance: {
        type: String,
        required: true
    },
    fare: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userhistory', UserSchema)