let path = require('path')
require('dotenv').config()

// Connect to the database
import mongoose from "mongoose"
mongoose.connect(process.env.DB_URL).then(db => {
  console.log(`Connected to ${db.connections[0].name}`)
}).catch(err => {
  console.log(err)
})

// Creating the application
let express = require('express')
export let app = express()

// App security
const helmet = require("helmet");
app.use(helmet({ contentSecurityPolicy: false }))

// View templates
app.locals.app_title = "Movie Lists App"
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Logger
let logger = require('morgan')
app.use(logger('dev'))

// Static files
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')))

// Sessions
const session = require('express-session')
app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false
  })
)

// Authentication
import passport from 'passport'
import { User } from './models/users'
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize())
app.use(passport.session())

// Routing
import { configureRoutes } from './routes'
configureRoutes(app)

// Handling errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something went wrong! Check your server logs')
})

//Starting the server
let server = require("http").createServer(app)
server.on('error', err => { console.log(6666); throw err })
server.listen(process.env.PORT || '8080', function (req, res) {
  console.log(`Server started at port ${process.env.PORT || '8080'}`);
})
