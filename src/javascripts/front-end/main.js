// Required by Webpack - do not touch
//require.context('../', true, /\.(html|txt|dat)$/i)
// require('../favicon.ico')
require.context('../../fonts/', true, /\.(eot|ttf|woff|woff2)$/i)
require.context('../../images/', true, /\.(png|jpg|jpeg|gif|svg)$/i)
require.context('../../stylesheets/', true, /\.(css|scss)$/i)
require.context('../../', true, /\.(json|txt|dat)$/i)

// TODO
import 'bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ContactForm from './components/ContactForm'
import SignInForm from './components/SignInForm'
import SignOut from './components/SignOut'
import SignUpForm from './components/SignUpForm'

if(document.querySelector('#main')) {
  ReactDOM.render(<App/>, document.querySelector('#main'))
}else if(document.querySelector('#contact')){
  ReactDOM.render(<ContactForm/>, document.querySelector('#contact'))
}else if(document.querySelector('#signin')) {
  ReactDOM.render(<SignInForm/>, document.querySelector('#signin'))
}else if(document.querySelector('#signup')) {
  ReactDOM.render(<SignUpForm/>, document.querySelector('#signup'))
}

if(document.querySelector('#signout-li')){
  ReactDOM.render(<SignOut/>, document.querySelector('#signout-li'))
}