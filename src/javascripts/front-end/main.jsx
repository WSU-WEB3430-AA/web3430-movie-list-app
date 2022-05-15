// Import SCSS/CSS files. Here. Don't worrry! Vite will sperate CSS from 
// JavaScript when it bundles the app.
import '../../stylesheets/main.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ContactForm from './forms/ContactForm'
import SignInForm from './forms/SignInForm'
import SignOut from './forms/SignOut'
import SignUpForm from './forms/SignUpForm'
import { AboutUs } from './pages/Pages'
import { Profile } from './pages/Profile'
import { toast } from 'react-toastify'

toast.configure()

if(document.querySelector('#main')) {
  ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, document.querySelector('#main'))
} else if(document.querySelector('#contact')) {
  ReactDOM.render(<React.StrictMode><ContactForm/></React.StrictMode>, document.querySelector('#contact'))
} else if(document.querySelector('#aboutus')) {
  ReactDOM.render(<React.StrictMode><AboutUs/></React.StrictMode>, document.querySelector('#aboutus'))
} else if(document.querySelector('#signin')) {
  ReactDOM.render(<React.StrictMode><SignInForm/></React.StrictMode>, document.querySelector('#signin'))
} else if(document.querySelector('#signup')) {
  ReactDOM.render(<React.StrictMode><SignUpForm/></React.StrictMode>, document.querySelector('#signup'))
} else if(document.querySelector('#profile')) {
  ReactDOM.render(<React.StrictMode><Profile/></React.StrictMode>, document.querySelector('#profile'))
} 

if(document.querySelector('#current-user-li')) {
  let el = document.querySelector('#current-user-li')
  ReactDOM.render(<React.StrictMode><SignOut displayName={el.dataset.displayName}/></React.StrictMode>, el)
}
