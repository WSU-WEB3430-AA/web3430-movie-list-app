"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Profile = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var passportLocalMongoose = require('passport-local-mongoose');

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: String
});
userSchema.plugin(passportLocalMongoose); // Based on but not exactly as https://datatracker.ietf.org/doc/html/draft-smarr-vcarddav-portable-contacts-00

var profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  provider: String,
  displayName: String,
  name: {
    family: {
      type: String,
      required: true,
      trim: true
    },
    given: {
      type: String,
      required: true,
      trim: true
    },
    middle: {
      type: String,
      trim: true
    }
  },
  avatar: String
});
profileSchema.virtual('fullName').get(function () {
  return this.name.family + ', ' + this.name.given;
});

var User = _mongoose["default"].model("User", userSchema);

exports.User = User;

var Profile = _mongoose["default"].model("Profile", profileSchema);

exports.Profile = Profile;