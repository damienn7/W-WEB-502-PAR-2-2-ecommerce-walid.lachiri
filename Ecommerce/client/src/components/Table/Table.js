// import * as React from 'react';
import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal, faFire } from "@fortawesome/free-solid-svg-icons";
import { TextField } from '@mui/material';
import axios from 'axios';


export default function BasicTable({ articlesPanier, setArticlesPanier, calcQuantity, orderId, setOrderId, calcPrice, countItem, setCountItem, price, setPrice, noItems, setNoItems, result, setResult }) {
  const [articles, setArticles] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  let i = 0;


  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/gozizi")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setArticles(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  // const fetchRating = (id_article) => {
  //   fetch(`http://127.0.0.1:8000/api/ratingavg/${id_article}`)
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       setRating(data)
  //     })
  // }

  // useEffect(() => {
  //   fetchRating()
  // }, [])

  function isAvailable(quantite = 0) {
    if (quantite > 0) {
      return <div className='greenbox'></div>
    }
    else if (quantite === 0) {
      return <div className='redbox'></div>
    }
  }
  function isAvailable2(quantite = 0) {
    if (quantite > 0) {
      return "Ajouter au panier"
      // return true
    }
    else if (quantite === 0) {
      return <p id="outofstock">Indisponible</p>
      // return false
    }
  }

  const random = () => {
    return Math.floor(Math.random() * 6);
  }

  const istop3 = (name) => {
    if (i === 0) {
      i++;
      return (
        <>
          <div className="indice" style={{ fontSize: "10px", fontStyle: "italic", color: "grey" }}>Article le plus vu <FontAwesomeIcon icon={faFire} style={{ color: "#d15400", }} /><FontAwesomeIcon icon={faFire} style={{ color: "#d15400", }} /></div>
          <FontAwesomeIcon icon={faMedal} style={{ color: "#ccbb00", }} /> {name}
        </>
      )
    }
    else if (i === 1) {
      i++;
      return <><FontAwesomeIcon icon={faMedal} style={{ color: "#9c9c9c", }} /> {name} </>
    }
    else if (i === 2) {
      i++;
      return <><FontAwesomeIcon icon={faMedal} style={{ color: "#895206", }} /> {name} </>
    }
    else {
      return name;
    }
  }

  const isthistheblood = (rank) => {
    if (rank) {
      return rank
    }
    else if (!rank) {
      return "?"
    }
  }

  function vuePanier(user_id) {
    axios
      .get(`http://localhost:8000/api/order/by/${user_id}`)
      .then((response) => {
        console.log('Articles présents dans le panier : ', response.data);
      })
      .catch((error) => {
        console.error('Erreur aucun article dans le panier : ', error.response.data);
      });
    // e.target.parentElement.parentElement.querySelector("#outlined-number-"+item_id).value = 1;
  }

  function handlePanier(e, item, item_id, quantite) {
    // let quantity = e.target.parentElement.parentElement.querySelector("#outlined-number-"+item_id).value;
    console.log(quantite);
    quantite = (Number(quantite)) ? quantite : 1;
    var data = new FormData();
    data.set('item_id', item.idefix);
    if (localStorage.getItem('id') !== null) {
      data.set('user_id', localStorage.getItem('id'));
      data.set('unit_price', (item.price * (1 - item.promotion / 100)));
      data.set('quantity', 1);
      axios
        .post('http://localhost:8000/api/order', data)
        .then((response) => {
          if (quantite === 0) {
            alert("Y'a pas d'article on t'a dit")
          }
          else if (quantite > 0) {
            console.log('Nouvel article ajouté au panier : ', response.data);
            let quantity = (Number(quantity)) ? quantity : 1;
            let price = (item.price * (1 - item.promotion / 100)) * quantity;
            setResult((item.price * (1 - item.promotion / 100)) + " EUR");
          }
        })
        .catch((error) => {
          console.error('Erreur l\'ajout de l\'article au panier : ');
        });
    } else {
      alert('Vous devez vous connecter pour ajouter un article au panier');
    }

    calcQuantity(orderId)
    calcPrice(articlesPanier)
  }



  function isbuyable(article, idefix, stock) {
    if (stock > 0)
      return <Button onClick={(e) => { handlePanier(e, article, idefix, stock) }}>{isAvailable2(stock)}</Button>;
    else if (stock === 0) {
      return <p id="outofstock">INDISPONIBLE</p>
    }
  }
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="right">Catégorie</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell align="right">Disponibilité</TableCell>
            <TableCell align="right">Prix</TableCell>
            <TableCell align="right">Panier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map infini ici pour le back */}
          {articles.map((article) => (
            <TableRow
              key={article.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className='lepainperdu'
              onMouseEnter={() => setHoveredArticle(article)}
              onMouseMove={(e) => {
                setMousePosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => {
                setHoveredArticle(null);
                setMousePosition({ x: 0, y: 0 });
              }}
            >
              <TableCell component="th" onClick={() => window.location.href = `/articles/search/${article.category}/${article.sub_category}/${article.idefix}`} scope="row">{istop3(article.name)}</TableCell>
              <TableCell align="right" onClick={() => window.location.href = `/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{article.sub_category}</TableCell>
              <TableCell align="right" onClick={() => window.location.href = `/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>
                {/* {random()}/5 */}
                {isthistheblood(article.avgRating)}/5

              </TableCell>
              <TableCell align-self="right" onClick={() => window.location.href = `/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{isAvailable(article.stock)}</TableCell>
              <TableCell align="right" onClick={() => window.location.href = `/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>
                {article.promotion
                  ? <>
                    <del>{article.price}€</del> <span>{(article.price * (1 - article.promotion / 100)).toFixed(2)}€</span>
                  </>
                  : `${article.price}€`}
              </TableCell>

              <TableCell align="right">{isbuyable(article, article.idefix, article.stock)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div
                style={{
                  position: 'fixed',
                  top: mousePosition.y,
                  left: mousePosition.x,
                  transform: 'translate(10px, 10px)'
                }}
              >
                {hoveredArticle && (
                  <img src={hoveredArticle.image} alt={hoveredArticle.name} style={{ width: '300px', height: 'auto' }} />
                )}
              </div>
    </TableContainer>
  );
}
