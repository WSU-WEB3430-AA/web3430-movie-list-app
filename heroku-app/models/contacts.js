"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var contactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  closed: Boolean,
  createdAt: Date
});

var Contact = _mongoose["default"].model("Contact", contactSchema);

exports.Contact = Contact;