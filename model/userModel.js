

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:email,
        required: [true,'Email is required'],
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        min:6,
    },
    phoneNumber:{
        type:Number,
    },
    createdAt:{
            type:String,
            default:Date.now,
        }
})

const User = mongoose.model('User',userSchema);
module.exports = User;