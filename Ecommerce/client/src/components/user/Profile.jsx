import axios from "axios";
import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Profile = () => {
  const id = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    new: '',
  });

  useEffect(() => {
    // Fetch user details from the backend
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        const { name, mail,country,delivery_adress } = response.data;
        setFormData(prev => ({ ...prev, name, mail,country,delivery_adress }));
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/api/users/${id}`, formData)
      .then((response) => {
        console.log('Utilisateur mis à jour:', response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Modifier mes informations
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="mail"
            value={formData.mail}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Adresse"
            name="delivery_adress"
            value={formData.delivery_adress}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Pays"
            name="country"
            value={formData.country}
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nouveau mot de passe"
            type="password"
            name="new"
            variant="outlined"
            onChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            mt={3}
          >
            Mettre à jour
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
