const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    f_name:{
        type:String,
        required:true
    },
    l_name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    reclamation:[{
        type: Schema.Types.ObjectId,
        ref: 'form'
    }]
})
module.exports = mongoose.model('user',userSchema)