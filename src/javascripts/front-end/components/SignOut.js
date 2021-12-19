import React from 'react'
import { toast } from 'react-toastify'

export default function SignOut() {
  const signUserOut = () => {
    fetch('/api/users/signout', {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(data => {
      toast.success(`Successfully logged out`, {onClose: () => {
        document.location = "/movie_lists"
      }})
    })
    .catch(err => {
      toast.error(err.message)
    });
  }

  return <a className="nav-link" onClick={signUserOut}>Sign out</a>
}
