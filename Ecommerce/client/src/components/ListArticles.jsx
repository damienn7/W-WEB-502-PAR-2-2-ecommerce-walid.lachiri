import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/articles');
      setArticles(result.data);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default ListArticles;
