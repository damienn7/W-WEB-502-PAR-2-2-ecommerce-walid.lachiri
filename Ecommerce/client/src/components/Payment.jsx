// import axios from "axios";
// import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// import '../style/payment.css';
// import { Navigate, redirect, useNavigate } from "react-router-dom";
// import { Navigation } from "@mui/icons-material";

function Payment(props) {
  const navigate = useLocation();

  let parameters = navigate.pathname.replace(/%20/g, ' ').split('/').slice(2);


//   const [data, setData] = useState({});
//   const [numberOfCard, setNumberOfCard] = useState('');
//   const [expireCard, setExpireCard] = useState('');
//   const [cvc, setCvc] = useState('');

//   const getInfoOfArticle = () => {
//     axios
//       .get(
//         `http://localhost:8000/api/articles/search/${props.options.categorieName}/${props.options.sous_categorieName}/${props.options.id}`
//       )
//       .then((reponse) => {
//         return reponse.data;
//       })
//       .then((data) => {
//         setData(data[0]);
//       });
//   };

//   useEffect(() => {
//       getInfoOfArticle();
//   }, []);

//   const getForm = (event) => {
//     event.preventDefault();


//     // console.log(numberOfCard);
//     // console.log(expireCard);
//     // console.log(cvc);

//     axios.post('http://localhost:8000/api/checkout').then(axiosReponse => {
//       window.location = axiosReponse.data.url;
//     })
//   }
return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#7ea3e7', marginTop: '1em', padding: '1em' }}>
        <h1 style={{ textAlign:'center', fontSize: '2em', fontFamily: 'monospace' }}>Produit acheté :  {parameters[0]}</h1>
        <h2 style={{ fontSize: '1em', fontFamily: 'monospace'}}>Description du produit : {parameters[1]}</h2>
        <h3>Prix de l'article : {parameters[2]}</h3>
        <h3>Stock de l'article : {parameters[3]}</h3>
        <h3>Nombre de vue de l'article: {parameters[4]}</h3>
      </div>

    </div>
  )
}
export default Payment;