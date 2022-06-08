const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = new Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    creationDate: {type: Date, require: true},
    isAdmin: {type: Boolean, require: true},
    profilePicture: {type: String, require: false},
    allPostIDs: {type: [{type: String}], default: []},
    isDeleted: {type: Boolean, default: false}
})

const User = mongoose.model('User', user)
module.exports = User