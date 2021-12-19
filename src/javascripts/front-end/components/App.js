import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { ToastContainer } from 'react-toastify';
import Movie from './Movie'
import Lists from './Lists'
import ListForm from './ListForm'
import Movies from './Movies'
import MovieForm from './MovieForm'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { Error401 } from './Pages'
import ListsGetter from './ListsGetter'
import MoviesGetter from './MoviesGetter'

export const MovieListsContext = createContext()

export default function App(){
  const [lists, setLists] = useState()
  const [movies, setMovies] = useState()
  const [currentList, setCurrentList] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['authenticated']);
  let [authenticated, setAuthenticated] = useState(cookies.authenticated === 'true') 

  return (
    <MovieListsContext.Provider value={{lists, setLists, authenticated, setAuthenticated, movies, setMovies, currentList, setCurrentList}}>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/movie_lists" element={<ListsGetter/>}>
            <Route index element={<Lists/>}/>
            <Route path="new" element={<ListForm/>}/>
            <Route path=":lid/edit" element={<ListForm/>}/>
            <Route path=":lid/movies" element={<MoviesGetter/>}>
              <Route index element={<Movies/>}/>
              <Route path="new" element={<MovieForm/>}/>
              <Route path=":mid" element={<Movie/>}/>
              <Route path=":mid/edit" element={<MovieForm/>}/>
            </Route>
          </Route>
          <Route path="/signin" element={<SignInForm/>}/>
          <Route path="/signup" element={<SignUpForm/>}/>
          <Route path="*" element={<Error401 />}/>
        </Routes>
      </BrowserRouter>
    </MovieListsContext.Provider>
  )
}