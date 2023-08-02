import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    console.log("test");
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/users', formData)
      .then((response) => {
        console.log('Nouvel utilisateur créé:', response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error.response.data);
      });
    // console.log('Nouvel utilisateur :', formData);
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={formData.pseudo} onChange={handleChange} />

        <label htmlFor="mail">mail:</label>
        <input type="email" name="mail" value={formData.mail} onChange={handleChange} />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Inscription</button>
      </form>
    </div>
  );
};

export default CreateUser;
