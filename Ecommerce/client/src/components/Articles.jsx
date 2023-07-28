import React, { useEffect, useState } from "react"

const Articles = () => {
  const [users, setUsers] = useState([])

  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.nom}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Articles;