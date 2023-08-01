import React, { useState } from 'react';

const UpdateUser = ({ user }) => {
  const [formData, setFormData] = useState({
    pseudo: user.pseudo,
    email: user.email,
    password: '',
    admin: user.admin === 1,
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
        <label htmlFor="pseudo">Pseudo:</label>
        <input type="text" name="pseudo" value={formData.pseudo} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label htmlFor="password">Nouveau mot de passe:</label>
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

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateUser;
