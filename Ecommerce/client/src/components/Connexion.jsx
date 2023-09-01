import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";


const sign = require("jwt-encode");

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    axios
      .post("http://localhost:8000/api/users/login", formData)
      .then((response) => {
        console.log("Utilisateur connecté:", response.data);
        setFormData({ mail: "", password: "" });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.admin);
        localStorage.setItem("id", response.data.user.id);
        console.log("Utilisateur connecté:", response.data);
        setFormData({ mail: "", password: "" });
        localStorage.setItem("token", response.data.token);
        if (response.data.user.admin === 0) {
          localStorage.setItem("role", "alliwantisplaybaldursgate3");
        } else {
          localStorage.setItem("role", "rachet&clank");
        }

        let params = new URLSearchParams(window.location.search);
        let categorie = params.get("categorie") || "";
        let sous_categorie = params.get("sous_categorie") || "";
        let id = params.get("id") || "";

        if (categorie !== "" && sous_categorie !== "" && id !== "") {
          fetch(
            `http://localhost:8000/api/articles/search/${categorie}/${sous_categorie}/${id}`
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const secret = "secret";

              const jwt = sign(data[0], secret);

                console.log(data)
                axios
                .post(
                `http://localhost:8000/api/checkout/${jwt}`
              )
              .then((axiosReponse) => {
                window.location.href = axiosReponse.data.url;
              });
            });
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        setError("Les informations de connexion sont incorrectes.");
      });
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Connexion
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Mail"
            type="email"
            name="mail"
            value={formData.mail}
            variant="outlined"
            onChange={handleChange}
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
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            mt={3}
          >
            Se connecter
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
