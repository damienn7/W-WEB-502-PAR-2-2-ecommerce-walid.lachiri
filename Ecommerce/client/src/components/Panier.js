import axios from 'axios';
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
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../style/Panier.css';

export default function Panier({ }) {

    const [result, setResult] = React.useState(0);
    const [noItems, setNoItems] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [countItem, setCountItem] = React.useState(0);
    const [orderId, setOrderId] = React.useState(0);
    const [articlesPanier, setArticlesPanier] = useState([]);

    useEffect(() => {
        handleItems()
    }, [])

    const calcQuantity = (id) => {
        axios
            .get(`http://localhost:8000/api/count_item/${id}`)
            .then((response) => {
                // console.table(response.data['quantity'][0]['count']);
                setCountItem(response.data['quantity'][0]['count']);
            })
            .catch((error) => {
                console.error('Erreur veuillez vous connecter pour visualiser votre panier : ', error.response.data);
            });

        console.log("in quantity function " + countItem);
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
                    setResult('Aucuns articles')
                    setArticlesPanier([]);
                }
                // setResult((noItems !== "") ? noItems : price +" EUR");

                alert(noItems);
            })
            .catch((error) => {
                console.error('Erreur dans la suppression de l\'article');
            });

        console.log("count item : " + countItem);
    }

    function handleItems() {
        axios
            .get(`http://localhost:8000/api/order/by/${localStorage.getItem("id")}`)
            .then((response) => {
                if (response.data.length >= 1) {
                    setArticlesPanier(response.data);
                    setNoItems("")
                    console.log(response);
                    console.table(response.data[0].order_id)
                    console.log("PRIX => ", calcPrice(response.data));
                    calcPrice(response.data);
                    setResult(calcPrice(response.data) + " EUR");
                } else {
                    setPrice("")
                    setNoItems("Aucuns articles")
                    setResult("Aucuns articles")
                }
                setOrderId(response.data[0].order_id);
                calcQuantity(response.data[0].order_id);
                return response.data[0].order_id;
            })
            .catch((error) => {
                console.error('Erreur aucun article dans le panier : ');
            });
        console.log("hello test " + orderId);
    }

    console.table(articlesPanier)

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
            data.set('delivery_address', '24 rue Pasteur');
            data.set('quantity', quantity);
            axios
                .post('http://localhost:8000/api/order', data)
                .then((response) => {
                    console.log('Nouvel article ajouté au panier : ', response.data);
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

        // console.log(articlesPanier);
        calcQuantity(orderId)
        calcPrice(articlesPanier)
    }

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
                                    <img src={article.image} width={"auto"} height={"50"} style={{ maxWidth: "60px", borderRadius:"10px", }} alt="image de l'article" />
                                    <div>
                                        <span>{article.name}</span>
                                    </div>
                                    <div className="quantity">
                                        <button>
                                            <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                                            </svg>
                                        </button>
                                        <label>{article.quantity}</label>
                                        <button>
                                            <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <label className="price small">€{article.price}</label>
                                </div>)
                            })}
                        </div>
                    </div>


                    <div class="card checkout">
                        <label class="title">Montant</label>
                        <div class="details">
                            <span>Sous-total :</span>
                            <span>{String(result).replace("EUR", "")}€</span>
                        </div>
                        <div class="checkout--footer">
                            <label class="price"><sup>€</sup>{String(result).replace("EUR", "")}</label>
                            <button class="checkout-btn">Paiement</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}
