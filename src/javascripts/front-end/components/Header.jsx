import React from "react"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import SignOut from "../forms/SignOut"

export function Header() {
  const [cookies] = useCookies(["authenticated", "display-name"])

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Movie Lists App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/movie_lists">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact us
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0" id="authul">
            {cookies.authenticated === "true" ? (
              <li className="nav-item dropdown" id="current-user-li">
                <SignOut displayName={"_ww_"} />
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
