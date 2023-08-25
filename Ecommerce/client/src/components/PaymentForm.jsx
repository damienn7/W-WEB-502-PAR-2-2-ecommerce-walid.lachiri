import axios from "axios";
import { useEffect, useState } from "react";
const sign = require("jwt-encode");

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

    const secret = "secret";

    const jwt = sign(articles, secret);
    
    axios
    .post(
      `http://localhost:8000/api/checkout/${jwt}`,
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
          maxLength={16}
          onChange={(event) => setNumberOfCard(event)}
        />
      </div>

      <div>
        <label htmlFor="expireCard">Expiration de la carte</label>
        <input
          type="text"
          name="expireCard"
          maxLength={5}
          onChange={(event) => setExpireCard(event)}
        />
      </div>

      <div>
        <label htmlFor="cvc">CVC</label>
        <input
          type="text"
          name="cvc"
          onChange={(event) => setCvc(event)}
          maxLength={3}
        />
      </div>

      <button type="submit">Payer</button>
    </form>
  );
}
