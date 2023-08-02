import React, { useEffect, useState } from "react"

const CurrentUser = () => {
  const [user, setUser] = useState([])

  const fetchCurrentUser = (user) => {
    fetch("http://127.0.0.1:8000/api/users/" + user)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUser(data)
      })
  }

  useEffect(() => {
    fetchCurrentUser(user)
  }, [user]);

  return (
    <div>
      <p>Hello {{user}} !</p>
    </div>
  );
}

export default CurrentUser;