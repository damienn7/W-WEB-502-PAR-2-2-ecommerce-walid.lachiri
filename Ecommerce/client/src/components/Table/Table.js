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


// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
  const [articles, setArticles] = useState([])
  const [quantity, setQuantity] = useState(1)
  let i = 0;

  function isAvailable(quantite = 0) {
    if (quantite > 0) {
      return <div className='greenbox'></div>
    }
    else if (quantite === 0) {
      return <div className='redbox'></div>
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
      <div className="indice" style={{ fontSize: "10px", fontStyle:"italic", color:"grey" }}>Article le plus vu <FontAwesomeIcon icon={faFire} style={{color: "#d15400",}} /><FontAwesomeIcon icon={faFire} style={{color: "#d15400",}} /></div> 
      <FontAwesomeIcon icon={faMedal} style={{ color: "#ccbb00", }}/> {name} 
      </>
      )}
    else if (i === 1) {
      i++;
      return <><FontAwesomeIcon icon={faMedal} style={{ color: "#9c9c9c", }} /> {name} </>}
    else if (i === 2) {
      i++;
      return <><FontAwesomeIcon icon={faMedal} style={{ color: "#895206", }} /> {name} </>}
      else {
        return name;
      }
  }
  const fetchUserData = () => {
    fetch("http://127.0.0.1:8000/api/gozizi")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setArticles(data)
      })
  }

  function handleChangeQuantity(e,stock){
    if (Number(e.target.value) > stock) {
      setQuantity(stock);
    }else{
      setQuantity(e.target.value);
    }
    e.target.value = quantity;
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  function handlePanier(e,item,item_id){

    let quantity = e.target.parentElement.parentElement.querySelector("#outlined-number-"+item_id).value;
    var data = new FormData();
    data.set('item_id',item.idefix);
    data.set('user_id',1);
    data.set('unit_price',item.price);
    data.set('delivery_address','24 rue Pasteur');
    data.set('quantity',quantity);
    axios
      .post('http://localhost:8000/api/order', data)
      .then((response) => {
        console.log('Nouvel article ajouté au panier : ', response.data);
      })
      .catch((error) => {
        console.error('Erreur l\'ajout de l\'article au panier : ', error.response.data);
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Catégorie</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell align="right">Disponibilité</TableCell>
            <TableCell align="right">Prix</TableCell>
            <TableCell align="right">Quantité</TableCell>
            <TableCell align="right">Panier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map infini ici pour le back */}
          {articles.map((article) => (
            <TableRow className='lepainperdu' 
            key={article.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" onClick={()=> window.location.href=`/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{istop3(article.name)}</TableCell>
              <TableCell align="right" onClick={()=> window.location.href=`/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{article.category}</TableCell>
              <TableCell align="right" onClick={()=> window.location.href=`/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{article.sub_category}</TableCell>
              <TableCell align="right" onClick={()=> window.location.href=`/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>
                {random()}/5
              </TableCell>
              <TableCell align-self="right" onClick={()=> window.location.href=`/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{isAvailable(article.stock)}</TableCell>
              <TableCell align="right" onClick={()=> window.location.href=`/articles/search/${article.category}/${article.sub_category}/${article.idefix}`}>{article.price}€</TableCell>
              <TableCell align="right">        
              <TextField
                id={'outlined-number-'+article.idefix}
                label="Number"
                type="number"
                InputProps={{inputProps:{min: "1", max: article.stock, step:"1"}}}
                onChange={(e)=>handleChangeQuantity(e,article.stock)}
                /></TableCell>
              <TableCell align="right"><Button onClick={(e) => {handlePanier(e,article,article.idefix)}}>Ajouter au panier</Button></TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
