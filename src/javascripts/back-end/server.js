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
// app.use(helmet({ contentSecurityPolicy: false }))

// View templates
// const manifest = await import(`${process.env.APP_DEPLOYMENT === 'heroku' ? './public' : '../../../public'}/manifest.json`) 
import manifest from '../../../public/manifest.json'

app.locals.app_title = "Movie Lists App"
app.locals._js_asset_filename = manifest['index.html']['file']
app.locals._css_asset_filename = manifest['index.html']['css'][0]
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Logger
let logger = require('morgan')
app.use(logger('dev'))

// Static files
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
if((process.env.APP_DEPLOYMENT || 'local') === 'heroku'){
  app.use(express.static(path.join(__dirname, 'public')))
}else{
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')))
}

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
// Page not found errors
app.use((req, res, next) => {
  let err = new Error(`Page "${req.path}" not found`)
  err.status = 404
  next(err)
})
// Error handler
app.use((err, req, res, next) => {
  if (!err.status || err.status == '') {
    err.status = 500
  }
  res.status(err.status || 500)
  res.render('error', { err })
})

//Starting the server
let server = require("http").createServer(app)
let port = process.env.PORT || '8080'
server.on('error', err => {
  if (err.syscall !== 'listen') {
    throw err
  }

  switch (err.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`)
      process.exit(1);
    default:
      throw err
  }
})
server.listen(port, () => {
  console.log(`Server started at port ${port}`)
})