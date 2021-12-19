import passport from 'passport'
import {User} from '../models/users'

// POST /api/users/signup
export const signUserUpAPI = (req, res, next) => {
  let user = new User ({
    // firstName: req.body.firstName,
    // lastName: req.body.lastName,
    // email: req.body.email,
    username: req.body.username
  }) 

  User.register(user, req.body.password, function(err, user) { 
    if (err) { 
      res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
    }else{ 
      res.json({success: true, message: "Your account was successfully created"}) 
    } 

    res.end()
  })
}

// POST /api/users/signin
export const signUserInAPI = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) res.status(500)
    else if(!user) res.status(404)
    req.logIn(user, function(err) {
      if (err) res.status(401)
      else res.status(200)
    })

    res.end()
  }
  
  // (err, user, info) => {
  //   if (err) {
  //     return res.status(500).json('Server error')
  //     // return next(err)
  //   }

  //   if (!user) {
  //     return res.status(404).json("User not found")
  //     // return res.redirect('/signin?info=' + info)
  //   }

  //   req.logIn(user, function(err) {
  //     if (err) {
  //       return res.status(401).json("Invalid credentials")
  //       // return next(err)
  //     }
  //     // return res.status(200)
  //     return res.redirect('/')
  //   })
  // }
  )(req, res, next)
}

// DELETE /api/users/signout
export const signUserOutAPI = (req, res, next) => {
  req.logout()
  res.end()
}
