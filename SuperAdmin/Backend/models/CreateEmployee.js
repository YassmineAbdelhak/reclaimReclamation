const mongoose = require('mongoose')
const Departements= require('./Departements')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const createempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
     departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Departements,
        required: true
    }, 
    role: {
        type: String,
        required: true
    },
    boss:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreateEmployee"
    }, 
    gender:{
        type: String,
        required: true
    },
    position:{
        type:String,
        required: false,
        default: "EMPLOYEE"
    }
},
 
{
    timestamps: true
  },)

createempSchema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('createEmployee', createempSchema)