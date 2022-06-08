const mongoose = require('mongoose')
const Schema = mongoose.Schema
const post = new Schema({
    userEmail: {type: String, require: true},
    title: {type: String, require: true},
    content: {type: String, require: false},
    images: {type: [{type: String}], default: []},
    creationDate: {type: Date, require: true},
    isDeleted: {type: Boolean, require: true},
    allCommentIDs: {type: [{type: String}], default: []}
})

const Post = mongoose.model('Post', post)
module.exports = Post