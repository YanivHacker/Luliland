const mongoose = require('mongoose')
const Schema = mongoose.Schema
const directMessages = new Schema({
    senderEmail: {type: String, require: true},
    receiverEmail: {type: String, require: true},
    image: {type: String, require: false},
    content: {type: String, require: true},
    creationDate: {type: Date, require: true},
})

const DirectMessage = mongoose.model('DirectMessage', directMessages)
module.exports = DirectMessage