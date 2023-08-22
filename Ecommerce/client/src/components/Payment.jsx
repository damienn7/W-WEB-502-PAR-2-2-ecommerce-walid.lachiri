// import axios from "axios";
// import { useEffect, useState } from "react";

// import '../style/payment.css';
// import { Navigate, redirect, useNavigate } from "react-router-dom";
// import { Navigation } from "@mui/icons-material";

function Payment(props) {
//   const navigate = useNavigate();

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
  <div>Payment reuissi</div>
)
}
//   return (
//     <>
//       <h1 style={{ textAlign: "center", transform: "translateY(100px)" }}>
//         Paiement pour l'article {data.name}
//       </h1>
//       <div
//         className="container"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "89vh",
//         }}
//       >
//         <form className="form_controller" onSubmit={getForm}>
          
//           <div className="number_of_card" style={{ marginBottom: '1em'}}>
//             <div className="card_options_title">
//               <label htmlFor="carte">Numero de carte</label>
//             </div>
//             <input
//               type="text"
//               id="carte"
//               value={numberOfCard}
//               className="inputForm"
//               onChange={(event) => setNumberOfCard(event.target.value)}
//             />
//           </div>

//           <div className="expir_carte" style={{ marginBottom: '1em'}}>
//             <div className="card_options_title">
//               <label htmlFor="exp_carte">Expiration de la carte</label>
//             </div>
//             <input
//               type="text"
//               id="exp_carte"
//               value={expireCard}
//               className="inputForm"
//               onChange={(event) => setExpireCard(event.target.value)}
//             />
//           </div>

//           <div className="password_carte" style={{ marginBottom: '1em'}}>
//             <div className="card_options_title">
//               <label htmlFor="password">CVC</label>
//             </div>
//             <input
//               type="text"
//               id="password"
//               value={cvc}
//               className="inputForm"
//               onChange={(event) => setCvc(event.target.value)}
//             />
//           </div>

//           <button type="submit" className="button_connect">Payer</button>
//         </form>
//       </div>
//     </>
//   );
// }

export default Payment;
