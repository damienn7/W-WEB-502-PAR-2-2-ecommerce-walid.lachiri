import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const id = localStorage.getItem("id");
  axios.get(`http://localhost:8000/api/users/${user.id}`).then((response) => {
    const name = response.data.name;
    const mail = response.data.mail;
  });
  return (
  <div>
    <h2>Inscription</h2>
    <form /*onSubmit={handleSubmit}*/>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={name} /*onChange={handleChange}*/ />

      <label htmlFor="mail">mail:</label>
      <input type="email" name="mail" value={mail} /*onChange={handleChange}*//>

      <label htmlFor="password">Mot de passe:</label>
      <input type="password" name="password" value="password" />
      <label htmlFor="cpassword">Confirmez le mot de passe:</label>
      <input type="password" name="cpassword" value="password" />
      <label htmlFor="new">Nouveau mot de passe:</label>
      <input type="password" name="new" value="password" />
      <button type="submit">Inscription</button>
    </form>
  </div>
);
};

export default Profile;
