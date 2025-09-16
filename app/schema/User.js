const { Schema, model } = require("mongoose")

const USER_MODEL = "Users"

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
})

const userModel = model(USER_MODEL, userSchema)

module.exports = { USER_MODEL, userModel }
