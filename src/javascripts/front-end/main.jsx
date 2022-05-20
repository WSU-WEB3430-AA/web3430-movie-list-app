// Import SCSS/CSS files. Here. Don't worrry! Vite will sperate CSS from
// JavaScript when it bundles the app.
import "../../stylesheets/main.scss"
import "react-toastify/dist/ReactToastify.css"
import "react-datepicker/dist/react-datepicker.css"

import "bootstrap"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import SignOut from "./forms/SignOut"
import { toast } from "react-toastify"

toast.configure()

if (document.querySelector("#main")) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.querySelector("#main")
  )
}

if (document.querySelector("#current-user-li")) {
  let el = document.querySelector("#current-user-li")
  ReactDOM.render(
    <React.StrictMode>
      <SignOut displayName={el.dataset.displayName} />
    </React.StrictMode>,
    el
  )
}
