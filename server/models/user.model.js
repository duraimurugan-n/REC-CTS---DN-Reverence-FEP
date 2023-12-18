const mongoose = require("mongoose");

//Database Schema - User Schema
const Schema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
   pref_id:{
    type: String,
   }
}, {
    timestamps: false
});


const user = mongoose.model('user', Schema);

module.exports = user;