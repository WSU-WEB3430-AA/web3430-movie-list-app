"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpPage = exports.signInPage = exports.profilePage = exports.indexPage = exports.contactPage = exports.aboutPage = void 0;
var title = 'My top 10 Movies';

var indexPage = function indexPage(req, res, next) {
  res.render('index');
};

exports.indexPage = indexPage;

var aboutPage = function aboutPage(req, res, next) {
  res.render('about');
};

exports.aboutPage = aboutPage;

var contactPage = function contactPage(req, res, next) {
  res.render('contact');
};

exports.contactPage = contactPage;

var signInPage = function signInPage(req, res, next) {
  res.render('signin');
};

exports.signInPage = signInPage;

var signUpPage = function signUpPage(req, res, next) {
  res.render('signup');
};

exports.signUpPage = signUpPage;

var profilePage = function profilePage(req, res, next) {
  res.render('profile');
};

exports.profilePage = profilePage;