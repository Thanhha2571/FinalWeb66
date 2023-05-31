const mongoose = require('mongoose')   
mongoose.connect('mongodb://localhost:27017/web66')

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = { userModel }