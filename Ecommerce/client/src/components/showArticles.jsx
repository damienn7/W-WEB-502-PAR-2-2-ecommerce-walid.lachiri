import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowArticle = (props) => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://127.0.0.1:8000/api/articles/${props.match.params.id}`);
      setArticle(result.data);
    };

    fetchData();
  }, [props.match.params.id]);

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
};

export default ShowArticle;
