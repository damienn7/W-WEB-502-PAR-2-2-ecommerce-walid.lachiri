import axios from "axios";
import { useLocation } from "react-router-dom";
import PrimarySearchAppBar from "./Header";
import StickyFooter from "./Footer";
import BreadcrumbsComponent from "./breadcrumbs";
import Article from "./Article";
import React, { useState, useEffect } from "react";


export default function   Category(props) {
  const [getData, setData] = useState([]);

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
  

  const fetchDatas = () => {
    axios
    .get(
      `http://localhost:8000/api/articles/search/${props.categorie}/${props.sous_categorie}`
    )
    .then((axiosReponse) => {
      return axiosReponse.data
    })
    .then((reponse) => setData(reponse));
  }
    useEffect(() => {
      fetchDatas()
    }, []);
  
  return (
    <>
      <PrimarySearchAppBar  articlesPanier={articlesPanier} setArticlesPanier={setArticlesPanier}  calcQuantity={calcQuantity} orderId={orderId} setOrderId={setOrderId} calcPrice={calcPrice} countItem={countItem} setCountItem={setCountItem} price={price} setPrice={setPrice} noItems={noItems} setNoItems={setNoItems} result={result} setResult={setResult}/>
      <BreadcrumbsComponent navigation={location} />
      <Article article={getData}/>
      <StickyFooter />
    </>
  );
}
