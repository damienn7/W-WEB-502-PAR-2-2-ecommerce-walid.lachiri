import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/users/login', formData)
      .then((response) => {
        // REDIRECTION A FAIRE SUR LA PAGE D'ACCEUIL (ROUTE A DEFINIR) + TOKEN DE CONNEXION SI BESOIN
        console.log('Utilisateur connecté:', response.data);
        setFormData({ mail: '', password: '' });
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion:', error);
      });
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mail">mail:</label>
        <input type="email" name="mail" value={formData.mail} onChange={handleChange} />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;