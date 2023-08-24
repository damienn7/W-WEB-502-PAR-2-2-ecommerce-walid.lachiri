import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    mail: user.mail,
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    axios
      .put(`http://localhost:8000/api/users/${user.id}`, formData)
      .then((response) => {
        console.log('Utilisateur mis à jour:', response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      });
    // console.log('Utilisateur mis à jour :', formData);
  };

  return (
    <div>
      <h2>Modifier un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Pseudo:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.mail} onChange={handleChange} />

        <label htmlFor="password">Nouveau mot de passe:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateUser;
