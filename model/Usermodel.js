const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
    image: String
})

const UserModle = mongoose.model("users", UserSchema)
module.exports = UserModle