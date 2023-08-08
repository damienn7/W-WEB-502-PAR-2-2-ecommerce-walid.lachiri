import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    axios
      .post('http://localhost:8000/api/users/login', formData)
      .then((response) => {
        console.log('Utilisateur connecté:', response.data);
        setFormData({ mail: '', password: '' });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.admin)

        // window.location.href = '/';
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion:', error);
        setError('Les informations de connexion sont incorrectes.');
      });
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="mail">Mail:</label>
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
