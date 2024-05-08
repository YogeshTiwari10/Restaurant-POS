const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const UsersModel = mongoose.model("users", userSchema);
module.exports = UsersModel