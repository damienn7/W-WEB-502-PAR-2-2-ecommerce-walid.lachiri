import axios from 'axios';
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import '../style/Panier.css';
import Grid from "@mui/material/Unstable_Grid2";
import Video from "../assets/Julien.mp4";
import Box from "@mui/material/Box";
import Pub from "../assets/Pub.png";
import { Modal, Typography } from "@mui/material";
import sign from "jwt-encode";
// import { TextField } from "@mui/material";
import { json, useNavigate } from "react-router-dom";

export default function Panier({ }) {

    const [list, setList] = useState([]);
    const [result, setResult] = React.useState(0);
    const [noItems, setNoItems] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [countItem, setCountItem] = React.useState(0);
    const [orderId, setOrderId] = React.useState(0);
    const [articlesPanier, setArticlesPanier] = useState([]);
    const [deliveryMode, setDeliveryMode] = React.useState('');
    const [deliveryType, setDeliveryType] = useState('normal');
    const deliveryCosts = {
        normal: 0,
        express: 5,
        day24: 10
    };
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryCountry, setDeliveryCountry] = useState('');
    const [countryError, setCountryError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [gift, setGift] = useState(0);

    const handleCountryChange = async (e) => {
        const country = e.target.value;
        setDeliveryCountry(country);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/checkCountryBan/${country}`);
            if (response.data.ban) {
                setCountryError(response.data.message);
                setErrorMessage(response.data.message);

            } else {
                setCountryError(null);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du pays:", error);
        }
    };


    const updateTotalPrice = () => {
        let basePrice = Number(String(result).replace("EUR", ""));
        let deliveryCost = deliveryCosts[deliveryType];
        return basePrice + deliveryCost;
    };
    useEffect(() => {
        handleItems()
        fetchArticlos()
    }, [])
    useEffect(() => {
        async function fetchUserData() {
            let response = await fetch('http://127.0.0.1:8000/api/users/' + localStorage.getItem('id'));
            let data = await response.json();
            setDeliveryAddress(data.delivery_adress);
            setDeliveryCountry(data.country);
        }

        fetchUserData();
    }, []);


    const fetchArticlos = () => {
        fetch("http://127.0.0.1:8000/api/gozizi")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setList(data)
                console.table(data);
            })
    }

    const calcQuantity = (id) => {
        axios
            .get(`http://localhost:8000/api/count_item/${id}`)
            .then((response) => {
                // console.table(response.data['quantity'][0]['count']);
                setCountItem(response.data["quantity"][0]["count"]);
            })
            .catch((error) => {
                console.error(
                    "Erreur veuillez vous connecter pour visualiser votre panier : ",
                    error.response.data
                );
            });

        // console.log("in quantity function " + countItem);
    };
    const calcPrice = (ArticlesToGetPrice) => {
        var price_calc = 0;
        for (let count = 0; count < ArticlesToGetPrice.length; count++) {
            const element = ArticlesToGetPrice[count];
            price_calc += element.quantity * element.unit_price;
        }
        setPrice(price_calc);

        return price_calc;
    };

    function updateQuantity(article, quantity, order_item_id, operation) {
        console.log(".join-btn-quan" + article.idefix);

        let timeout = setTimeout(() => {
            document.getElementById("join-btn-quan" + article.idefix + "left").style.pointerEvents = "none";
            document.getElementById("join-btn-quan" + article.idefix + "right").style.pointerEvents = "none";
        }, 4000);

        if (operation === "inc") {
            quantity = quantity + 1;
        } else {
            if (quantity >= 1) {
                quantity = quantity - 1;
            } else {
                return;
            }
        }
        axios
            .put(`http://localhost:8000/api/order_item/${order_item_id}`,
                {
                    unit_price: article.unit_price,
                    quantity: quantity,
                    item_id: article.item_id,
                    order_id: article.order_id
                })
            .then((response) => {
                console.table(response.data);
            })
            .catch((error) => {
                console.error('Erreur veuillez vous connecter pour visualiser votre panier : ', error.response.data);
            });

        clearTimeout(timeout);
        calcQuantity(orderId)
        calcPrice(articlesPanier)
        handleItems();
        document.getElementById("join-btn-quan" + article.idefix + "left").style.pointerEvents = "";
        document.getElementById("join-btn-quan" + article.idefix + "right").style.pointerEvents = "";
    }

    const handleDeleteFromBasket = (id) => {
        axios
            .delete(`http://localhost:8000/api/order_item/${id}`)
            .then((response) => {
                // console.log(response.data);
                handleItems();
                calcQuantity(orderId);
                if (countItem >= 1) {
                    setArticlesPanier([]);
                    setResult(calcPrice() + " EUR");
                } else {
                    // setPrice("")
                    // console.log(articles.length);
                    // setNoItems("Aucuns articles")
                    setResult("Aucuns articles");
                    setArticlesPanier([]);
                }
                // setResult((noItems !== "") ? noItems : price +" EUR");

                alert(noItems);
            })
            .catch((error) => {
                console.error("Erreur dans la suppression de l'article");
            });

        console.log("count item : " + countItem);
    };

    function handleItems() {
        axios
            .get(`http://localhost:8000/api/order/by/${localStorage.getItem("id")}`)
            .then((response) => {
                if (response.data.length >= 1) {
                    setArticlesPanier(response.data);
                    setNoItems("");
                    console.log(response);
                    console.table(response.data[0].order_id);
                    console.log("PRIX => ", calcPrice(response.data));
                    calcPrice(response.data);
                    setResult(calcPrice(response.data) + " EUR");
                } else {
                    setPrice("");
                    setNoItems("Aucuns articles");
                    setResult("Aucuns articles");
                }
                setOrderId(response.data[0].order_id);
                calcQuantity(response.data[0].order_id);
                return response.data[0].order_id;
            })
            .catch((error) => {
                console.error("Erreur aucun article dans le panier : ");
            });
        console.log("hello test " + orderId);
    }

    // console.table(articlesPanier);



    const handlePanier = (e, item, item_id) => {

        let quantity = e.target.parentElement.parentElement.querySelector("#outlined-number-" + item_id).value;
        console.log(quantity);
        quantity = (Number(quantity)) ? quantity : 1;
        var data = new FormData();
        data.set('item_id', item.id);
        if (localStorage.getItem('id') !== null) {
            console.log('user id ' + localStorage.getItem('id'));
            data.set('user_id', localStorage.getItem('id'));
            data.set('unit_price', item.price);
            data.set('delivery_address', deliveryAddress);
            data.set('quantity', quantity);
            axios
                .post('http://localhost:8000/api/order', data)
                .then((response) => {
                    console.log('Nouvel article ajouté au panier : ', response.data);
                    // let quantity = (Number(quantity)) ? quantity : 1;
                    // let price = item.price * quantity;
                    // setResult(item.price + " EUR");
                })
                .catch((error) => {
                    console.error('Erreur l\'ajout de l\'article au panier lol ');
                });
        } else {
            alert('Vous devez vous connecter pour ajouter un article au panier');
        }
        // console.log(articlesPanier);
        calcQuantity(orderId);
        calcPrice(articlesPanier);
    };


    // console.log("count item : " + countItem);


    function handleItems() {
        axios
            .get(`http://localhost:8000/api/order/by/${localStorage.getItem("id")}`)
            .then((response) => {
                if (response.data.length >= 1) {
                    setArticlesPanier(response.data);
                    setNoItems("");
                    // console.log(response);
                    // console.table(response.data[0].order_id)
                    // console.log("PRIX => ", calcPrice(response.data));
                    calcPrice(response.data);
                    setResult(calcPrice(response.data) + " EUR");
                } else {
                    setPrice("");
                    setNoItems("Aucuns articles");
                    setResult("Aucuns articles");
                }
                setOrderId(response.data[0].order_id);
                calcQuantity(response.data[0].order_id);
                return response.data[0].order_id;
            })
            .catch((error) => {
                console.error("Erreur aucun article dans le panier : ");
            });
        console.log("hello test " + orderId);
    }

    const updateDeliveryMethodInDB = async () => {

        axios
            .put(`http://localhost:8000/api/order/`+orderId, {
                delivery_method: deliveryType,
                country: deliveryCountry,
                delivery_address: deliveryAddress,
                gift:gift
            })
            .then((response) => {
                buyPanier();
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la mise à jour de la méthode de livraison: ",
                    error
                );
            });
    };

    const buyPanier = () => {
        const secret = "secret";
        axios
            .post(
                `http://localhost:8000/api/checkoutPanier/${localStorage.getItem("id")}`
            )
            .then((axiosReponse) => {
                window.location = axiosReponse.data.url;
            });
    };

    return (
        <div class="main">
            <Header articlesPanier={articlesPanier} setArticlesPanier={setArticlesPanier} calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult} />
            {/* <p>Hello world !</p> */}
            <div class="app">
                <div class="master-container">
                    <div class="card cart">
                        <label class="title">Votre panier</label>
                        <div class="products">
                            {articlesPanier.map((article, index) => {
                                return (<div className="product" key={index}>
                                    <img src={article.image} width={"auto"} height={"50"} style={{ maxWidth: "60px", borderRadius: "10px", }} alt="image de l'article" />
                                    <div>
                                        <span>{article.name}</span>
                                    </div>
                                    <div className="quantity">
                                        <button id={"join-btn-quan" + article.idefix + "left"} style={{ cursor: "pointer", pointerEvents: "auto" }} onClick={(e) => updateQuantity(article, article.quantity, article.asterix, "dec")}>
                                            <svg onClick={(e) => updateQuantity(article, article.quantity, article.asterix, "dec")} fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                                            </svg>
                                        </button>
                                        <label id='label'><span>{article.quantity}</span></label>
                                        <button id={"join-btn-quan" + article.idefix + "right"} style={{ cursor: "pointer", pointerEvents: "auto" }} onClick={(e) => updateQuantity(article, article.quantity, article.asterix, "inc")}>
                                            <svg onClick={(e) => updateQuantity(article, article.quantity, article.asterix, "inc")} fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <label className="price small">€{article.price}</label>
                                    <Button
                                        onClick={() =>
                                            handleDeleteFromBasket(article.asterix)}
                                    >
                                        Delete
                                    </Button>
                                </div>)
                            })}
                        </div>
                    </div>


                    <Typography variant="h6" style={{ marginTop: '20px' }}>Adresse de livraison:</Typography>
                    <TextField
                        fullWidth
                        label="Adresse"
                        variant="outlined"
                        margin="normal"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Pays"
                        variant="outlined"
                        margin="normal"
                        value={deliveryCountry}
                        onChange={handleCountryChange}
                        error={!!countryError}
                        helperText={countryError}
                    />


                    <div class="card checkout">
                        <label class="title">Montant</label>
                        <div class="details">
                            <span>Options de livraison:</span>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="normal"
                                        checked={deliveryType === 'normal'}
                                        onChange={(e) => setDeliveryType(e.target.value)}
                                    />
                                    Livraison normale (0€)
                                </label>
                                <br></br>
                                <label>
                                    <input
                                        type="radio"
                                        value="express"
                                        checked={deliveryType === 'express'}
                                        onChange={(e) => setDeliveryType(e.target.value)}
                                    />
                                    Livraison express (5€)
                                </label>
                                <br></br>
                                <label>
                                    <input
                                        type="radio"
                                        value="day24"
                                        checked={deliveryType === 'day24'}
                                        onChange={(e) => setDeliveryType(e.target.value)}
                                    />
                                    Livraison 24h (10€)
                                </label>
                            </div>
                            <label>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setGift(e.target.checked)}
                                    />
                                    Emballage cadeau pour votre commande
                                </label>
                        </div>


                        <div class="checkout--footer">
                            <label class="price">
                                <sup>€</sup>
                                {updateTotalPrice()}
                            </label>
                            <button class="checkout-btn" onClick={updateDeliveryMethodInDB} disabled={!!countryError}>
                                Paiement
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
            <Footer />
        </div>
    );
}



