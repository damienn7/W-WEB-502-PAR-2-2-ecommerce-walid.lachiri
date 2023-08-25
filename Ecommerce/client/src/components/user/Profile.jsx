import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const id = localStorage.getItem("id");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    new: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/api/users/${id}`,formData)
    .then((response) => {
      console.log('Utilisateur mis à jour:', response.data);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    });
  };
  return (
  <div>
    <h2>Modifier mes informations</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" onChange={handleChange} />
      <label htmlFor="mail">mail:</label>
      <input type="email" name="mail" onChange={handleChange}/>
      <label htmlFor="new">Nouveau mot de passe:</label>
      <input type="password" name="new"/>
      <button type="submit">Inscription</button>
    </form>
  </div>
);
};

export default Profile;
