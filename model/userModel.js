const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    cnic:{
        type:String,
        unique:true
    },
    amount:{
        type:Number
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    }
})

const user = mongoose.model('User',userSchema)
module.exports = user;