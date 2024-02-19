const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseUniqueValidator = require('mongoose-unique-validator')
const formSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    d_danger: {
        type: Schema.Types.ObjectId,
        ref: 'escalation'
    },
    adresse: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    departement: {
        type: Schema.Types.ObjectId,
        ref: 'departements'
        
    },
    problemImage: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref: 'createEmployee',
        default: null
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    },
    date:{
        type:Date,
        default: ""
    }
})
formSchema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('form', formSchema)