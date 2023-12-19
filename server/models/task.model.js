const mongoose = require("mongoose");

//Database Schema - Task Schema
const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});


const task = mongoose.model('task', Schema);

module.exports = task;