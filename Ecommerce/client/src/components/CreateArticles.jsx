import React, { useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
  const [image, setImage] = useState('');
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState(0);
  const [caracteristiques_id, setCaracteristiquesId] = useState('');
  const [stocks_id, setStocksId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const article = {
      image,
      nom,
      description,
      prix,
      caracteristiques_id,
      stocks_id,
    };

    await axios.post('http://yourapiurl.com/articles/', article);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Image:
        <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      </label>
      <label>Nom:
        <input type="text" value={nom} onChange={e => setNom(e.target.value)} />
      </label>
      <label>Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>Prix:
        <input type="number" value={prix} onChange={e => setPrix(Number(e.target.value))} />
      </label>
      <label>Caracteristiques ID:
        <input type="text" value={caracteristiques_id} onChange={e => setCaracteristiquesId(e.target.value)} />
      </label>
      <label>Stocks ID:
        <input type="text" value={stocks_id} onChange={e => setStocksId(e.target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateArticle;
