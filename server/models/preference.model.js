const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    pref_id:{
        type: Number,
        required:true,
        unique: true
    },
    name:{
        type:String
    },
    theme:{
        type:String,
        default: 'light'
    },
    notification:{
        type:Boolean,
        default: false,
    },
    font_family:{
        type:String,
        default: 'monospace'
    },
    font_size:{
        type: Number,
        default: 12, 
    },
    language:{
        type:String,
        default:'english',
    },
    color_palette:{
        primary: {
            light: {type:String},
            main: {type:String},
            dark: {type:String},
            contrastText: {type:String},
        },
        secondary: {
            light: {type:String},
            main: {type:String},
            dark: {type:String},
            contrastText: {type:String},
        }
    },
    
    layout:{
        type:String
    },

    userid: {
        type: String
    },
    
});


const preference = mongoose.model('preference', Schema);

module.exports = preference;