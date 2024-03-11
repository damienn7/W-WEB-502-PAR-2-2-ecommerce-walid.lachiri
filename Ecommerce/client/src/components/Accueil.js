import '../style/Unique.css';
import '../style/Accueil.css'
import Button from '@mui/material/Button';
import Header from './Header'
import Footer from './Footer'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import Video from '../assets/Julien.mp4'
import Pub from '../assets/Pub.png'
import Carousel from 'react-material-ui-carousel'
import MCarousel from './Carousel/Carousel.js'
import Table from './Table/Table'
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import BreadcrumbsComponent from "./breadcrumbs";
import React, { useEffect, useState } from "react";
import axios from 'axios';
// import {result,noItems,price,countItem,orderId,articlesPanier,setResult,setNoItems,setPrice,setCountItem,setOrderId,setArticlesPanier,calcPrice,calcQuantity} from './StatePanier';


function Accueil() {
  const location = useLocation();

const [result, setResult] = React.useState(0);
const [noItems, setNoItems] = React.useState("");
const [price, setPrice] = React.useState(0);
const [countItem, setCountItem] = React.useState(0);
const [orderId, setOrderId] = React.useState(0);
const [articlesPanier, setArticlesPanier] = useState([]);

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
  
      console.log("in quantity function "+countItem);
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

  const decryptData = async (encryptedData, key) => {
    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(12) }, key, encryptedData);
  
    const textDecoder = new TextDecoder();
    return textDecoder.decode(decryptedData);
  };
  // const storedEncryptedData = localStorage.getItem('encryptedAdmin');
  //        if (storedEncryptedData) {
  //         const key = localStorage.getItem('encryptedAdmin');
  //          decryptData(new Uint8Array(storedEncryptedData.split(',')), key)
  //            .then(decrypted => {
  //             //  setData(decrypted);
  //             console.log(decrypted);
  //            })
  //            .catch(error => console.error('Erreur de déchiffrement :', error));
  //           }
  return (
    <div>
      <Header articlesPanier={articlesPanier} setArticlesPanier={setArticlesPanier}  calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult}/>
      <BreadcrumbsComponent navigation={location} />
      <div className="carrousel">
        <MCarousel  width="100%" height="100%"/>
      </div>
      <Box padding={10}>
        <Table articlesPanier={articlesPanier} setArticlesPanier={setArticlesPanier}  calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult}></Table>
      </Box>
      <Footer />
    </div>
  );
}

export default Accueil;
