import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import Video from "../assets/Julien.mp4";
import Pub from "../assets/Pub.png";
import Carousel from "react-material-ui-carousel";
import { Modal, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';

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
const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 569,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    p: 4,
};
function Articleunique({ categorie, sous_categorie, id }) {
    const [multipleCharacteristics, setMultipleCharacteristics] = useState(undefined);
    const [articles, setArticles] = useState([]);
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [list, setList] = useState([]);
    const [rating, setRating] = useState([]);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const [result, setResult] = React.useState(0);
    const [noItems, setNoItems] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [countItem, setCountItem] = React.useState(0);
    const [orderId, setOrderId] = React.useState(0);
    const [articlesPanier, setArticlesPanier] = useState([]);
    const commentRef = useRef();
    const [currentArticle, setCurrentArticle] = useState([])
    const handleOpen = () => setFopen(true);
    const [fopen, setFopen] = useState(false);
    const handleClose = () => setFopen(false);
    const [comments, setComments] = useState([]);
    const params = useParams();
    const [charInSelect, setCharInSelect] = useState("")
    const articleId = params.id;

    function isAvailable2(quantite = 0) {
        if (quantite > 0) {
            return "Ajouter au panier"
            // return true
        }
        else if (quantite === 0) {
            return <p id="outofstock">Indisponible</p>
            // return false
        }
    }

    function calcCharacters(description) {
        try {
            if ((Number(window.screen.width) / 2) < (description.length * 16)) {
                return description.substring(0, Number(window.screen.width) / 2 / 16) + "...";
            } else {
                return description;
            }
        } catch (error) {
            console.log(error);
        }
    }

    function isbuyable(article, idefix, stock) {
        if (stock > 0)
            return (<>      <TextField
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
                        console.log("Votre achat => ", currentArticle)
                    }}
                >
                    Ajouter au panier
                </Button>
                <Button variant="contained" onClick={openModal}>
                    Acheter l'article
                </Button></>)
        else if (stock === 0) {
            return <p id="outofstock">INDISPONIBLE</p>
        }
    }
    
    const fetchComments = () => {
        axios.get(`http://localhost:8000/api/comments/${articleId}`)
            .then(response => {
                // console.log(response.data)
                setComments(response.data);
                //console.table('caca'+ Object.values(response.data))
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
            });
    }

const handleChangeChar = (e) => {
    setCharInSelect(e.target.value);
    // console.log("La bonne couleur =>", e.target.value)
  };

    const CharacteristicsSelector = () => {
        if (multipleCharacteristics !== undefined) {
            return Object.keys(multipleCharacteristics).map((characteristic) => {
                if (multipleCharacteristics[characteristic].length > 1) {
                    return (
                        <FormControl variant="standard" sx={{ m: 3, minWidth: 40 }} defaultValue={'test'}>
                            <InputLabel id="demo-simple-select-standard-label">{characteristic}</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={charInSelect}
                                onChange={(e) => {currentArticle[characteristic] = e.target.value
                                handleChangeChar(e)}}
                                label={characteristic}
                                name={characteristic}
                            >
                                {multipleCharacteristics[characteristic].map((characteristicValue) => {
                                    return (<MenuItem align="right" value={characteristicValue} >{characteristicValue}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    )
                }
                return null
            })
        }
        else {
            return "Loading..."
        }
    }
    const CharacteristicLine = () => {
        if (multipleCharacteristics !== undefined) {
            return Object.keys(multipleCharacteristics).map((characteristic) => {
                currentArticle[characteristic] = multipleCharacteristics[characteristic][0];
                return characteristic + " : " + multipleCharacteristics[characteristic][0] + " - ";
            })
        }
        else {
            return "Loading..."
        }
    }

    const calcQuantity = (id) => {
        axios
            .get(`http://localhost:8000/api/count_item/${id}`)
            .then((response) => {
                setCountItem(response.data['quantity'][0]['count']);
            })
            .catch((error) => {
                console.error('Erreur veuillez vous connecter pour visualiser votre panier : ', error.response.data);
            });

    }

    const calcPrice = (ArticlesToGetPrice) => {
        var price_calc = 0;
        for (let count = 0; count < ArticlesToGetPrice.length; count++) {
            const element = ArticlesToGetPrice[count];
            price_calc += element.quantity * element.unit_price;
        }
        setPrice(price_calc);

        return price_calc;
    }

    const navigate = useNavigate();

    const fetchCharacteristics = async () => {
        await fetch("http://127.0.0.1:8000/api/characteristic/" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setMultipleCharacteristics(data)
            })
    }
    const fetchUserData = async () => {
        await fetch(
            `http://localhost:8000/api/articles/search/${categorie}/${sous_categorie}/${id}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setArticles(data[0]);
                currentArticle["id"] = data[0].id
                currentArticle["price"] = data[0].price
            });
    };

    const handlePanier = (e, item, item_id) => {
        let quantity = e.target.parentElement.parentElement.querySelector("#outlined-number-" + item_id).value;
        quantity = (Number(quantity)) ? quantity : 1;
        var data = new FormData();
        data.set('item_id', item.id);
        if (localStorage.getItem('id') !== null) {
            data.set('user_id', localStorage.getItem('id'));
            data.set('unit_price', item.price);
            data.set('quantity', quantity);
            axios
                .post('http://localhost:8000/api/order', data)
                .then((response) => {
                    let quantity = (Number(quantity)) ? quantity : 1;
                    let price = item.price * quantity;
                    setResult(item.price + " EUR");
                })
                .catch((error) => {
                    console.error('Erreur l\'ajout de l\'article au panier lol ');
                });
        } else {
            alert('Vous devez vous connecter pour ajouter un article au panier');
        }

        calcQuantity(orderId)
        calcPrice(articlesPanier)
    }

    const getUrl = (event) => {
        return navigate(`/paymentForm/${categorie}/${sous_categorie}/${id}`);
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
        fetchUserData();
        fetchArticles();
        fetchArticlos();
        fetchCharacteristics();
        fetchComments()
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
                    {parseFloat(rating.test).toFixed(2)}/5
                </Typography>
            );
        }
    };

    let userId = localStorage.getItem("id")

    function getnotedkid(note, articleId) {
        const comment = commentRef.current.value;

        axios.get(`http://localhost:8000/api/rating/${userId}/${articleId}`)
            .then(response => {
                if (response.data.hasNoted) {
                    return axios.put(`http://localhost:8000/api/rating/${response.data.ratingId}`, {
                        "id_user": userId,
                        "id_article": articleId,
                        "rating": note,
                        "comment": comment
                    });
                } else {
                    return axios.post('http://localhost:8000/api/notedefou', {
                        "id_user": userId,
                        "id_article": articleId,
                        "rating": note,
                        "comment": comment
                    });
                }
            })
            .then(response => {
                alert("Votre note et commentaire ont bien été traités");
                handleClose();
                window.location.reload(true);

            })
            .catch(error => {
                console.log("Error processing note and comment:", error);
            });
    }

console.log(currentArticle)

    return (
        <div className="App">
            <Header articlesPanier={articlesPanier} setArticlesPanier={setArticlesPanier} calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult} />
            <div className="Unique">
                <Grid className="Unique" sx={{ overflow: "none" }} container spacing={2}>
                    <Grid xs={10}>
                        {/* NOM du produit */}
                        <Button onClick={handleOpen}>{isthistheblood()}
                        </Button>

                        <Modal
                            open={fopen}
                            onClose={handleClose}
                            aria-labelledby="modal-bogoce"
                            aria-describedby="modal-bogocette"
                        >
                            <Box sx={style2}>
                                <Typography id="modal-bogoce" variant="h6" sx={{ mt: 2 }} component="h2">
                                    Notez {articles.name}
                                </Typography>
                                <Typography>
                                    <Button value="1" onClick={(e) => getnotedkid(e.currentTarget.value, articles.id)}>1</Button>
                                    <Button value="2" onClick={(e) => getnotedkid(e.currentTarget.value, articles.id)} >2</Button>
                                    <Button value="3" onClick={(e) => getnotedkid(e.currentTarget.value, articles.id)} >3</Button>
                                    <Button value="4" onClick={(e) => getnotedkid(e.currentTarget.value, articles.id)} >4</Button>
                                    <Button value="5" onClick={(e) => getnotedkid(e.currentTarget.value, articles.id)} >5</Button>
                                    { }
                                    <TextField
                                        inputRef={commentRef}
                                        variant="outlined"
                                        label="Add your comment"
                                        fullWidth
                                        margin="normal"
                                    />
                                </Typography>
                                <Button onClick={handleClose}>Fermer</Button>
                            </Box>
                        </Modal>
                        <Typography variant="h4">{articles.name}</Typography>
                        {/* caractéristiques courte du produit */}
                        <Typography
                            variant="h8"
                            sx={{ fontStyle: "oblique", color: "grey" }}
                        >
                            <CharacteristicLine />
                        </Typography>
                        <Typography>{articles.stock} restant(s)</Typography>
                        <div className="Description" style={{ maxWidth: "70%" }}>
                            <Grid container spacing={2} disableEqualOverflow>
                                <Grid xs={3}>
                                    {/* Image du produit */}
                                    <img src={articles.image} width="100%"></img>
                                </Grid>
                                <Grid xs={9} sx={{ display: "flex", zIndex: "-1", textOverflow: "clip" }}>
                                    {/* Description du produit */}
                                    <Typography sx={{ textOverflow: "ellipsis", overflow: "none", maxWidth: "400px", zIndex: "-1" }}>{calcCharacters(articles.description)}</Typography>
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
                                {articles.promotion
                                    ? <>
                                        <del>{articles.price}€</del><br />
                                        {(articles.price * (1 - articles.promotion / 100)).toFixed(1)}€<br />
                                        <small>-({articles.promotion}%)</small>
                                    </>
                                    : `${articles.price}€`}
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
                            {isbuyable(articles, articles.id, articles.stock)}
                            <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* */}
                {!userId && (
                    <>
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
                    </>
                )}

                {/**/}
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
                        <Typography fontSize={10} color="blue" onClick={() => alert("mdr pranked")} style={{ cursor: "pointer" }}>
                            être informé d'une baisse de prix
                        </Typography>
                        <CharacteristicsSelector/>
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
                <Typography variant="h5" gutterBottom>
    Commentaires
</Typography>

                { <List>
            {
            comments.map((comment) => (
                <ListItem>
                    <ListItemText 
                        secondary={comment.name}
                        primary={`${(comment.comment!=null?comment.comment+" -":"")}  ${comment.rating}/5`}
                        />
                </ListItem>
                
            ))}

        </List> }
        <hr className="Marginextop"></hr>

                <Grid
                    container
                    spacing={2}
                    sx={{ display: "flex", justifyContent: "space-Evenly" }}
                >
                    <Grid xs={12}>
                        <Typography align="center" fontSize={18} color="red">
                            Nos articles les plus populaires
                        </Typography>
                    </Grid>
                    {list.slice(0, 6).map((listed, index) => (
                        <Grid xs={2} key={index}>
                            <a href={`/articles/search/${listed.category}/${listed.sub_category}/${listed.idefix}`}><img src={listed.image} width={150} /></a>
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
