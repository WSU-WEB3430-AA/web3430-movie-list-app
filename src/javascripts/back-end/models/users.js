import mongoose from 'mongoose'
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: String
})

userSchema.plugin(passportLocalMongoose)
export let User = mongoose.model("User", userSchema)

// let profileSchema = new Schema({
//   user: userSchema,
//   firstName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true
//   }
// })
