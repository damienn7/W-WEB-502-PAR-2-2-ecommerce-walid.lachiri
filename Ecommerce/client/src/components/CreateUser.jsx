import React, { useState } from 'react';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    admin: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/users', formData)
      .then((response) => {
        console.log('Nouvel utilisateur créé:', response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      });
    // console.log('Nouvel utilisateur :', formData);
  };

  return (
    <div>
      <h2>Créer un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pseudo">Pseudo:</label>
        <input type="text" name="pseudo" value={formData.pseudo} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="admin">Admin:</label>
        <input
          type="checkbox"
          name="admin"
          checked={formData.admin}
          onChange={() =>
            setFormData((prevFormData) => ({ ...prevFormData, admin: !prevFormData.admin }))
          }
        />

        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateUser;
