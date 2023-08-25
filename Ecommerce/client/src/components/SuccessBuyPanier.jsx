import axios from "axios";
import { useEffect, useState } from "react";

export default function SuccessBuyPanier(props) {
  const [panier, setArticleInPanier] = useState([]);

  const renderPanier = () => {
    axios
      .get(`http://localhost:8000/api/order/by/${props.id}`)
      .then((axiosReponse) => {
        return axiosReponse.data;
      })
      .then((reponse) => {
        setArticleInPanier(reponse);
      });
  };

  useEffect(() => {
    renderPanier();
  }, []);

  return (
  <div style={{ display: "flex", justifyContent: "center" }}>
   {panier.map((article) => (
      <div
        style={{ backgroundColor: "#7ea3e7", marginTop: "1em", padding: "1em" }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2em",
            fontFamily: "monospace",
          }}
        >
          Produit acheté : {article.name}
        </h1>
        <h2 style={{ fontSize: "1.5em", fontFamily: "monospace" }}>
          Description du produit : {article.description}
        </h2>
        <div
          className="image"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={article.image}
            alt="image"
            height={200}
            width={200}
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3>Prix de l'article : {article.price}</h3>
        <h3>Stock de l'article : {article.stock}</h3>
        <h3>Nombre de vue de l'article: {article.views}</h3>
      </div>
  ))};
  </div>
  )
}
