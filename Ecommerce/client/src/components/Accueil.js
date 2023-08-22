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


function Accueil() {
  const location = useLocation();

  const [result, setResult] = React.useState(0);
  const [noItems, setNoItems] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [countItem, setCountItem] = React.useState(0);
  const [orderId, setOrderId] = React.useState(0);
  const [articles, setArticles] = useState([]);

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

  return (
    <div>
      <Header articles={articles} setArticles={setArticles}  calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult}/>
      <BreadcrumbsComponent navigation={location} />
      <div className="carrousel">
        <MCarousel />
      </div>
      <Box padding={10}>
        <Table articlesPanier={articles} setArticlesPanier={setArticles}  calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult}></Table>
      </Box>
      <Footer />
    </div>
  );
}

export default Accueil;
