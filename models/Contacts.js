const { SchemaTypes } = require('mongoose');
const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
    },
    phone:{
        type: String,
        required:true
    },
    date:{
        type: String,
        default:Date.now
    }
});

module.exports = mongoose.model('contact',ContactSchema);