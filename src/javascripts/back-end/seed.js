let path = require('path')
require('dotenv').config()

// Connect to the database
import mongoose from "mongoose"
import { List, Movie } from "./models/movie_lists"
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL).then(db => {
  console.log(`Connected to ${db.connections[0].name}`)
}).catch(err => {
  console.log(err)
})

import { top10 } from "../top10"
import { Profile, User } from "./models/users"

// STEP 1: Create a user
console.log('STEP 1: Creating the user')
let user = new User({
  username: 'ww',
  email: 'ww@example.com'
})

User.register(user, 'ww', async function(err, user) { 
  if (err) { 
    console.log(err)
  }else{ 
    await new Profile({
      user,
      provider: 'local',
      name: { family: 'Wlast', given: 'Wfirst' }
    }).save()
    console.log('....... DONE!')

    // STEP 2: Add the top 10 IMDB movies
    console.log('STEP 2: Adding the top 10 IMDB movies')
    for(let m of top10){
      let movie = new Movie({
        "title": m.title,
        "year": m.year,
        "rated": m.rated,
        "genre": m.genre,
        "plot": m.plot,
        "poster":m.poster,
        "rating": m.rating,
        "votes": m.votes,
        "releaseDate": m.releaseDate,
        addedBy: user,
        addedAt: new Date(),
        updatedAt: new Date(),
        "reviews": []
      })

     await movie.save()
    }
    console.log('....... DONE!')

    // STEP 3: Create a list containing the top 10 IMDB movies
    console.log('STEP 3: Creating a list containing the top 10 IMDB movies')

    Movie.find().exec().then(movies=> {
      let list = new List({
        title: 'Top 10 IMDB Movies',
        description: 'Top 10 IMDB movies of all time as rated by regular IMDB voters.',
        owner: user,
        public: true,
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        movies: movies
      })
    
      list.save(err =>{
        if(err){
          console.log(err)
        }
        console.log('....... DONE!')
      })
    })
  } 
})





// Movie.find().exec().then(movies=> {
//    let list = new List({
//      title: 'Top 10 IMDB Movies',
//      description: 'Top 10 IMDB movies of all time as rated by regular IMDb voters.',
//      public: true,
//     votes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     movies: movies
//   })

//   list.save(err =>{
//     if(err){
//       console.log(err)
//     }
//   })
// })

// List.find().populate('movies').exec().then(list=> {
//   console.log(list[0].movies)
// })