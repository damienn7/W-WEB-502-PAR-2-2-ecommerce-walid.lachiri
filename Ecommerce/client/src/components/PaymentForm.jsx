import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentForm({ categorie, sous_categorie, id }) {
  const [articles, setArticles] = useState([]);
  const [numberOfCard, setNumberOfCard] = useState("");
  const [expireCard, setExpireCard] = useState("");
  const [cvc, setCvc] = useState("");

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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(numberOfCard.target.value);
    // console.log(expireCard.target.value);
    // console.log(cvc.target.value);
    axios
    .post(
      `http://localhost:8000/api/checkout/${articles.name}/${articles.description}/${articles.price}/${articles.stock}/${articles.views}`
    )
    .then((axiosReponse) => {
      window.location = axiosReponse.data.url;
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="numberofcard">Numero de carte</label>
        <input
          type="text"
          name="numberOfCard"
          onChange={(event) => setNumberOfCard(event)}
        />
      </div>

      <div>
        <label htmlFor="expireCard">Expiration de la carte</label>
        <input
          type="text"
          name="expireCard"
          onChange={(event) => setExpireCard(event)}
        />
      </div>

      <div>
        <label htmlFor="cvc">CVC</label>
        <input type="text" name="cvc" onChange={(event) => setCvc(event)} />
      </div>

      <button type="submit">Payer</button>
    </form>
  );
}
