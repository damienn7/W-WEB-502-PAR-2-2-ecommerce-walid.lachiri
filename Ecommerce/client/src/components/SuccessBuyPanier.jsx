import axios from "axios";
import { useEffect, useState } from "react";

export default function SuccessBuyPanier({ id }) {
  const [panier, setArticleInPanier] = useState([]);
  const [delivery_address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const renderPanier = () => {
    axios
      .get(`http://localhost:8000/api/order_item/by/${id}`)
      .then((response) => {
        console.table(response.data);
        setArticleInPanier(response.data);

        // Calculate total price
        const total = response.data.reduce((acc, article) => acc + article.price* (1 - article.promotion/100), 0);
        setTotalPrice(total);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
      axios
      .get(`http://localhost:8000/api/order/${id}`)
      .then((response) => {
        setAddress(response.data.delivery_address);
        setCountry(response.data.country);
        setDate(response.data.created_at);
      })
  };

  useEffect(() => {
    renderPanier();
  }, []);

  const generateOrderContent = () => {
    let content = "Détails de la commande:\n\n";
    
    content += `Adresse: ${delivery_address}\n`;
    content += `Pays: ${country}\n`;
    content += `Date: ${new Date(date).toLocaleDateString()}\n`;
    content += `Prix total: ${totalPrice}€\n\n`;

    panier.forEach(article => {
      content += `Produit: ${article.name}\n`;
      content += `Description: ${article.description}\n`;
      content += `Prix: ${article.price* (1 - article.promotion/100)}€\n`;
    });
    
    return content;
  };

  const handleDownload = () => {
    const content = generateOrderContent();
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = href;
    link.download = "details_commande.txt";
    link.click();
    
    URL.revokeObjectURL(href);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button onClick={handleDownload} style={{ margin: "1em" }}>Télécharger</button>

      <h2>Adresse: {delivery_address}</h2>
      <h2>Pays: {country}</h2>
      <h2>Date: {new Date(date).toLocaleDateString()}</h2>
      <h2>Prix total: {totalPrice}€</h2>

      {panier.map((article) => (
        <div
          key={article.id}
          style={{ backgroundColor: "#7ea3e7", marginTop: "1em", padding: "1em" }}
        >
          <h1 style={{ textAlign: "center", fontSize: "2em", fontFamily: "monospace" }}>
            Produit acheté : {article.name}
          </h1>
          <h2 style={{ fontSize: "1.5em", fontFamily: "monospace" }}>
            Description du produit : {article.description}
          </h2>
          <div className="image" style={{ display: "flex", justifyContent: "center" }}>
            <img src={article.image} alt="image" height={300} width={300} style={{ objectFit: "cover" }} />
          </div>
          <h3>Prix de l'article : {article.price* (1 - article.promotion/100)}€</h3>
        </div>
      ))}
    </div>
  );
}
