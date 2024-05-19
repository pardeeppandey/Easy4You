const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addhar: {
        type: String,
        required: true
    },
    lisence: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('driver', UserSchema)