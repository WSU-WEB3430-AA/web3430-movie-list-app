"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newContactAPI = exports.closeContactAPI = exports.allContactsAPI = void 0;

var _contacts = require("../models/contacts");

// GET /api/contacts
var allContactsAPI = function allContactsAPI(req, res, next) {
  _contacts.Contact.find().exec().then(function (contacts) {
    res.write(JSON.stringify(contacts));
    res.end();
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // POST /api/contacts


exports.allContactsAPI = allContactsAPI;

var newContactAPI = function newContactAPI(req, res, next) {
  var contact = new _contacts.Contact(req.body);
  contact.closed = false;
  contact.createdAt = new Date();
  contact.updatedAt = new Date();
  contact.save(function (err) {
    if (err) {
      res.json({
        success: false,
        message: 'Unable to save'
      });
    } else {
      res.status(200);
      res.end();
    }
  });
}; // PUT /api/contacts/:cid/close


exports.newContactAPI = newContactAPI;

var closeContactAPI = function closeContactAPI(req, res, next) {
  _contacts.Contact.findOne({
    _id: req.params.cid
  }).exec().then(function (contact) {
    contact.closed = true;
    contact.updatedAt = new Date();
    contact.save(function (err) {
      if (err) {
        res.json({
          success: false,
          message: "Unable to close contact"
        });
        res.end();
      } else {
        res.end();
      }
    });
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Unable to find contact"
    });
    res.end();
  });
};

exports.closeContactAPI = closeContactAPI;