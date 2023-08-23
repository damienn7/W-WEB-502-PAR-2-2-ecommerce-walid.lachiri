import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import Video from "../assets/Julien.mp4";
import Pub from "../assets/Pub.png";
import Carousel from "react-material-ui-carousel";
import { Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 569,
  display: "flex",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  alignItems: "center",
  p: 4,
};
function Articleunique({ categorie, sous_categorie, id }) {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [list, setList] = useState([]);
  const [rating, setRating] = useState([]);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");

  const fetchUserData = () => {
    fetch(
      `http://localhost:8000/api/articles/search/${categorie}/${sous_categorie}/${id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(data[0]);
      });
  };

  function handlePanier(e, item, item_id) {
    let quantity = e.target.parentElement.parentElement.querySelector(
      "#outlined-number-" + item_id
    ).value;
    // console.log(quantity);
    console.log("user id " + user_id);
    var data = new FormData();
    data.set("item_id", item.id);
    data.set("user_id", user_id);
    data.set("unit_price", item.price);
    data.set("delivery_address", "24 rue Pasteur");
    data.set("quantity", quantity);
    axios
      .post("http://localhost:8000/api/order", data)
      .then((response) => {
        console.log("Nouvel article ajouté au panier : ", response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur l'ajout de l'article au panier : ",
          error.response.data
        );
      });
    setQuantity(1);
  }

  const getUrl = (event) => {
    return navigate(`/paymentForm/${categorie}/${sous_categorie}/${id}`);
    // event.preventDefault();
    // axios
    //   .post(
    //     `http://localhost:8000/api/checkout/${articles.name}/${articles.description}/${articles.price}/${articles.stock}/${articles.views}`
    //   )
    //   .then((axiosReponse) => {
    //     // window.location = axiosReponse.data.url;
    //   });
  };
  function handleChangeQuantity(e, stock) {
    if (Number(e.target.value) > stock) {
      setQuantity(stock);
    } else {
      setQuantity(e.target.value);
    }
    e.target.value = quantity;
  }

  const fetchArticles = () => {
    fetch(`http://localhost:8000/api/ratingavg/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data[0] !== undefined) {
          setRating(data[0]);
        }
      });
  };
  const fetchArticlos = () => {
    fetch("http://127.0.0.1:8000/api/gozizi")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setList(data)
      })
  }

  useEffect(() => {
    fetchArticlos()
  }, [])
  useEffect(() => {
    fetchUserData();
    fetchArticles();
    fetchArticlos();
  }, []);
  const isthistheblood = () => {
    if (rating.test === undefined) {
      return (
        <Typography variant="" sx={{ color: "primary.main" }}>
          Soyez le premier à noter cet article
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ color: "error.main" }}>
          {parseFloat(rating.test)}/5
        </Typography>
      );
    }
  };
  return (
    <div className="App">
      <Header />
      <div className="Unique">
        <Grid className="Unique" container spacing={2}>
          <Grid xs={10}>
            {/* NOM du produit */}*{isthistheblood()}
            <Typography variant="h4">{articles.name}</Typography>
            {/* caractéristiques courte du produit */}
            <Typography
              variant="h8"
              sx={{ fontStyle: "oblique", color: "grey" }}
            >
              24 Go GDDR6 - Dual HDMI/Dual DisplayPort - PCI{" "}
            </Typography>
            <Typography>{articles.stock} restant(s)</Typography>
            <div className="Description">
              <Grid container spacing={2} disableEqualOverflow>
                <Grid xs={3}>
                  {/* Image du produit */}
                  <img src={articles.image} width="100%"></img>
                </Grid>
                <Grid xs={9} sx={{ display: "flex" }}>
                  {/* Description du produit */}
                  <Typography sx={{}}>{articles.description}</Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            xs={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-Evenly",
              border: 2,
              mx: "auto",
              width: 200,
              height: "auto",
              borderRadius: "5px",
            }}
          >
            <div className="article__price">
              {/* Prix du produit */}
              <Typography color="grey">TTC</Typography>
              <Typography variant="h3" color="red">
                {articles.price}€
              </Typography>
              <Typography color="grey">HT</Typography>

              <Typography
                variant="h6 indice"
                style={{ fontStyle: "italic", color: "grey" }}
              >
                {parseFloat(articles.price * 0.8).toFixed(2)}€
              </Typography>
            </div>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                id={"outlined-number-" + articles.id}
                label="Number"
                type="number"
                InputProps={{
                  inputProps: { min: "1", max: articles.stock, step: "1" },
                }}
                onChange={(e) => handleChangeQuantity(e, articles.stock)}
                value={quantity}
              />
              <Button
                variant="outlined"
                sx={{ marginBottom: "10px" }}
                onClick={(e) => {
                  handlePanier(e, articles, articles.id);
                }}
              >
                Ajouter au panier
              </Button>
              <Button variant="contained" onClick={openModal}>
                Acheter l'article
              </Button>
              <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#85ec83",
                      color: "black",
                      marginRight: "1em",
                      fontSize: "0.9em",
                    }}
                    href={`http://localhost:3000/login?categorie=${categorie}&sous_categorie=${sous_categorie}&id=${id}`}
                  >
                    Me connecter
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#83d7ec",
                      color: "black",
                      marginRight: "1em",
                    }}
                    href={`http://localhost:3000/inscription?categorie=${categorie}&sous_categorie=${sous_categorie}&id=${id}`}
                  >
                    S'inscrire
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#eaec83",
                      color: "black",
                      marginRight: "1em",
                    }}
                    onClick={getUrl}
                  >
                    Payer directement
                  </Button>
                </Box>
              </Modal>
            </Grid>
            <Typography fontSize={10} color="blue">
              être informé d'une baisse de prix
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={10}>
            <img src={Pub} width="40%" />
          </Grid>
          <Grid xs={2} marginTop={1}>
            <Box>
              <video
                controls
                autostart="true"
                autoPlay
                src={Video}
                type="video/mp4"
                width="90%"
              />
            </Box>
          </Grid>
        </Grid>
        <hr className="Marginextop"></hr>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-Evenly" }}
        >
          <Grid xs={12}>
            <Typography align="center" fontSize={18} color="red">
              Les autres raclo achètent ça aussi
            </Typography>
          </Grid>
          {list.slice(0, 6).map((listed, index) => (
            <Grid xs={2} key={index}>
              <img src={listed.image} width={150} />
              <Typography>{listed.name}</Typography>
            </Grid>
          ))}
        </Grid>

        <hr></hr>
        <br></br>
      </div>
      
      <Footer />
      <hr></hr>
      <br></br>

      <hr className="Marginextop"></hr>

    </div>

  );
}

export default Articleunique;
