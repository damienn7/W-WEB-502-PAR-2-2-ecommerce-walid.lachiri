import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArticle = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const result = await axios.get(`http://yourapiurl.com/articles/${props.match.params.id}`);
      setTitle(result.data.title);
      setContent(result.data.content);
    };

    fetchArticle();
  }, [props.match.params.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const article = {
      title,
      content
    };

    await axios.put(`http://127.0.0.1:8000/api/articles/${props.match.params.id}`, article);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>Content:
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateArticle;
