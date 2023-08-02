// import * as React from 'react';
import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  function isAvailable(quantite = 0){
    if(quantite > 0){
      return <div className='greenbox'></div>
    }
    else if(quantite === 0){
      return <div className='redbox'></div>
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

  useEffect(() => {
    fetchUserData()
  }, [])

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
          </TableRow>
        </TableHead>
        <TableBody>
            {/* Map infini ici pour le back */}
          {articles.map((article) => (
            <TableRow key={article.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{article.name}</TableCell>
              <TableCell align="right">{article.category}</TableCell>
              <TableCell align="right">{article.sub_category}</TableCell>
              <TableCell align="right">{article.rating}</TableCell>
              <TableCell align-self="right">{isAvailable(article.stock)}</TableCell>
              <TableCell align="right">{article.price}€</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
