const mongoose = require('mongoose')
const Schema = mongoose.Schema
const comment = new Schema({
    postID: {type: String, require: true},
    content: {type: String, require: false},
    images: {type: String, require: false},
    creationDate: {type: String, require: true, default: Date.now().toString()},
    isDeleted: {type: Boolean, require: true, default: false}
})

const Comment = mongoose.model('Comment', comment)
module.exports = Comment