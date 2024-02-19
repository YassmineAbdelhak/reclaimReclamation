const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseUniqueValidator = require('mongoose-unique-validator')
const departementSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    departement_name: {
        type: String,
        required: true,
        unique: true
    },
    boss: {
        type: Schema.Types.ObjectId,
        ref: 'createEmployee'
    }
})
departementSchema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('departements', departementSchema)