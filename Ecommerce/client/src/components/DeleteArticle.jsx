import React from 'react';
import axios from 'axios';

const DeleteArticle = (props) => {
  const handleDelete = async () => {
    await axios.delete(`http://127.0.0.1:8000/api/articles/${props.match.params.id}`);
    // Rediriger vers la liste d'articles après la suppression
    props.history.push('/articles');
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteArticle;
