const mongoose = require('mongoose')
const Schema = mongoose.Schema
const escalationSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    reclamation_ddanger: {
        type: String,
        required: true
    },
    timer:{
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('escalation', escalationSchema)