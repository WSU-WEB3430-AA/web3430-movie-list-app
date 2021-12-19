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
import { User } from "./models/users"

// let u = new User({
//   username: 'ww'
// })

// User.register(u, 'ww', function(err, user) { 
//   if (err) { 
//     console.log(err)
//   }
// })

// for(let m of top10){
//   let movie = new Movie({
//     "title": m.title,
//     "year": m.year,
//     "rated": m.rated,
//     "genre": m.genre,
//     "plot": m.plot,
//     "poster":m.poster,
//     "rating": m.rating,
//     "votes": m.votes,
//     "releaseDate": m.releaseDate,
//     addedBy: "61bd18c668b693ed3932dea2",
//     addedAt: new Date(),
//     updatedAt: new Date(),
//     "reviews": []
//   })

//   movie.save(err =>{
//     if(err){
//       console.log(err)
//     }
//   })
// }

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