import mongoose from "mongoose"
const passportLocalMongoose = require("passport-local-mongoose")

const Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: String,
})

userSchema.plugin(passportLocalMongoose)

// Based on but not exactly as https://datatracker.ietf.org/doc/html/draft-smarr-vcarddav-portable-contacts-00
let profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  provider: String,
  displayName: String,
  name: {
    family: { type: String, required: true, trim: true },
    given: { type: String, required: true, trim: true },
    middle: { type: String, trim: true },
  },
  avatar: String,
})

profileSchema.virtual("fullName").get(function () {
  return this.name.family + ", " + this.name.given
})

export let User = mongoose.model("User", userSchema)
export let Profile = mongoose.model("Profile", profileSchema)
