import React, { useEffect, useState } from "react"
import Avatar from "react-avatar"
import { UnifiedPageHeader } from "./Pages"

export function Profile() {
  const [profile, setProfile] = useState()

  useEffect(() => {
    fetch("/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch(console.error)
  }, [])

  if (!profile) return <p>Loading...</p>

  return (
    <div className="d-flex">
      <div className="flex-shrink-0 text-center">
        <h1 className="display-5 text-primary pt-5">
          <Avatar name={profile.displayName} round={true} />
        </h1>
      </div>
      <div className="flex-grow-1 ms-5">
        <UnifiedPageHeader title={profile.displayName} start_sz={10} end_sz={2} />
        <p>
          <strong>Email</strong>: {profile.username}{" "}
        </p>
        <p>
          <strong>Email</strong>: {profile.email}{" "}
        </p>
      </div>
    </div>
  )
}
