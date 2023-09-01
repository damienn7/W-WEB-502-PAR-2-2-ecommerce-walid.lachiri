import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const sign = require("jwt-encode");

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
        
        let params = new URLSearchParams(window.location.search);
        
        let categorie = params.get("categorie");
        let sous_categorie = params.get("sous_categorie");
        let id = params.get("id");


        if(categorie !== null && sous_categorie !== null && id !== null){
          fetch(
            `http://localhost:8000/api/articles/search/${categorie}/${sous_categorie}/${id}`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const secret = "secret";
              const jwt = sign(data[0], secret);

              axios
              .post(
              `http://localhost:8000/api/checkout/${jwt}`
            )
            .then((axiosReponse) => {
              window.location = axiosReponse.data.url;
            });
            });
          } else {
            window.location.href = '/signin'  
          }
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error.response.data);
      });
    // console.log('Nouvel utilisateur :', formData);
  };
  
  
  return (
    <Container maxWidth="xs">
        <Box mt={8} textAlign="center">
            <Typography variant="h4" gutterBottom>
                Inscription
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off"> {/* You can also add it to the form level */}
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Name" 
                    name="name" 
                    value={formData.name} 
                    variant="outlined" 
                    onChange={handleChange}
                    inputProps={{ autoComplete: "off" }} // Add this
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
                    inputProps={{ autoComplete: "off" }} // And this
                />
                <TextField 
                    fullWidth 
                    margin="normal" 
                    label="Mot de passe" 
                    type="password" 
                    name="password" 
                    value={formData.password}
                    variant="outlined" 
                    onChange={handleChange} 
                    inputProps={{ autoComplete: "new-password" }} // For password fields, use "new-password"
                />
                <Button 
                    fullWidth 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    mt={3}
                >
                    Inscription
                </Button>
            </form>
        </Box>
    </Container>
);
};

export default CreateUser;
