"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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