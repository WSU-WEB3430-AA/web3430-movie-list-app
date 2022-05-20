import React from "react"
import Avatar from "react-avatar"
import { useCookies } from "react-cookie"
import { toast } from "react-toastify"

export default function SignOut({ displayName }) {
  const [cookies, setCookie] = useCookies(["authenticated"])
  const signUserOut = () => {
    fetch("/api/users/signout", {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Unable to sign out")
        }
        setCookie("authenticated", "false", { path: "/" })
        toast.success(`Successfully logged out`, {
          onClose: () => {
            document.location = "/movie_lists"
          },
        })
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <>
      <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
        <Avatar name={displayName} size={30} /> {displayName}
      </a>
      <ul className="dropdown-menu" style={{ right: 0, left: "auto" }}>
        <li>
          <a className="dropdown-item" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" onClick={signUserOut}>
            Sign out
          </a>
        </li>
      </ul>
    </>
  )
}

// SignOut.propTypes = {
//   displayName: PropTypes.string.isRequired,
// }
