import express from 'express'

import {contactPage, aboutPage, indexPage, signInPage, signUpPage} from './controllers/pages'
import {signUserUpAPI, signUserInAPI, signUserOutAPI} from './controllers/users'
import { allContactsAPI, closeContactAPI, newContactAPI } from './controllers/contacts'
import { allMovieListsAPI, createMovieListAPI, deleteMovieListAPI, oneMovieListAPI, updateMovieListAPI } from './controllers/movie_lists'
import {allMovieListMoviesAPI, oneMovieListMovieAPI, createMovieAPI, updateMovieAPI, deleteMovieAPI, reviewMovieAPI, allMoviesNotInMovieLisAPI} from './controllers/movies'
import { Profile } from './models/users'

let router = express.Router()

function isSignedIn(req){
  return req.isAuthenticated && req.isAuthenticated()
}

function requireSignIn(req, res, next) {
  if(isSignedIn(req)){
    next()
  }else{
    res.status(401).json("unauthorized request")
    res.end()
  }
}

export function configureRoutes(app){
  app.all('*', async (req, res, next)=>{
    app.locals.signedIn = isSignedIn(req)
    if(isSignedIn(req)){
      if(!req.session.user_profile){
        req.session.user_profile = await Profile.findOne({user: req.user}).exec()
        console.log(">>>>")
      }
      app.locals.displayName = req.session.user_profile.name.family + ', ' + req.session.user_profile.name.given
    }
    res.cookie("authenticated", app.locals.signedIn)
    next()
  })

  /*****************************************************************************
   * Section 1: Rendered pages
   ****************************************************************************/
  // Rendered Pages
  router.get('/', indexPage)
  router.get('/about', aboutPage)
  router.get('/contact', contactPage)

  router.get('/signin', signInPage)
  router.get('/signup', signUpPage)

  router.get('/movie_lists*', indexPage)
  router.get('/movie_lists/:lid/movies', indexPage)

  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
  // Users
  router.post('/api/users/signup', signUserUpAPI)
  router.post('/api/users/signin', signUserInAPI)
  router.delete('/api/users/signout', signUserOutAPI)

  // Contacts
  router.get('/api/contacts', allContactsAPI)
  router.post('/api/contacts', newContactAPI)
  router.put('/api/contacts/:cid/close', closeContactAPI)

  // Movie lists
  router.get('/api/movie_lists', allMovieListsAPI)
  router.get('/api/movie_lists/:lid', oneMovieListAPI)
  router.post('/api/movie_lists', requireSignIn, createMovieListAPI)
  router.put('/api/movie_lists/:lid', requireSignIn, updateMovieListAPI)
  router.delete('/api/movie_lists/:lid', requireSignIn, deleteMovieListAPI)

  // Movies
  router.get('/api/movie_lists/:lid/movies', allMovieListMoviesAPI)
  router.get('/api/movie_lists/:lid/movies/:mid', oneMovieListMovieAPI)
  router.get('/api/movie_lists/:lid/addable_movies', allMoviesNotInMovieLisAPI)
  router.post('/api/movie_lists/:lid/movies', requireSignIn, createMovieAPI)
  router.put('/api/movie_lists/:lid/movies/:mid', requireSignIn, updateMovieAPI)
  router.delete('/api/movie_lists/:lid/movies/:mid', requireSignIn, deleteMovieAPI)
  router.post('/api/movie_lists/:lid/movies/:mid/review', requireSignIn, reviewMovieAPI)

  app.use('/', router)
}