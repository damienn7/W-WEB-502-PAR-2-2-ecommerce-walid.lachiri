import React, { useEffect, useState } from "react"

const Articles = () => {
  const [articles, setArticles] = useState([])

  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setArticles(data)
        // console.log(data);
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>
      {articles.length > 0 && (
        <ul>
          {articles.map(articles => (
            <li key={articles.id}><a href={"http://localhost:8000/api/articles/"+articles.id}>{articles.nom}</a></li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Articles;