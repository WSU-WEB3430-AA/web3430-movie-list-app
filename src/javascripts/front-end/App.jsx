import React, { createContext, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Movie from "./pages/Movie"
import Lists from "./pages/Lists"
import ListForm from "./forms/ListForm"
import Movies from "./pages/Movies"
import MovieForm from "./forms/MovieForm"
import SignInForm from "./forms/SignInForm"
import SignUpForm from "./forms/SignUpForm"
import { AboutUs, Error401 } from "./pages/Pages"
import ListsGetter from "./data/ListsGetter"
import MoviesGetter from "./data/MoviesGetter"
import { Profile } from "./pages/Profile"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import ContactForm from "./forms/ContactForm"
import { CookiesProvider } from "react-cookie"

export const MovieListsContext = createContext()

export default function App() {
  const [lists, setLists] = useState()
  const [movies, setMovies] = useState()
  const [currentList, setCurrentList] = useState()

  return (
    <CookiesProvider>
      <MovieListsContext.Provider
        value={{
          lists,
          setLists,
          movies,
          setMovies,
          currentList,
          setCurrentList,
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <Link to="/movie_lists" className="btn btn-primary btn-lg">
                    Go to app
                  </Link>
                }
              />
              <Route path="/movie_lists" element={<ListsGetter />}>
                <Route index element={<Lists />} />
                <Route path="new" element={<ListForm />} />
                <Route path=":lid/edit" element={<ListForm />} />
                <Route path=":lid/movies" element={<MoviesGetter />}>
                  <Route index element={<Movies />} />
                  <Route path="new" element={<MovieForm />} />
                  <Route path=":mid" element={<Movie />} />
                  <Route path=":mid/edit" element={<MovieForm />} />
                </Route>
              </Route>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Error401 />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </MovieListsContext.Provider>
    </CookiesProvider>
  )
}
