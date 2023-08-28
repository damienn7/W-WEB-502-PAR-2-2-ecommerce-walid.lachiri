import React from 'react';
import '../style/TableStyle.css';
import axios from 'axios';

const TableStyle = () => {
  const id = localStorage.getItem('id');  
  axios.get(`http://127.0.0.1:8000/api/order/user/${id}`)
  .then((response) => {
    console.log(response.data);
  });
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Date de commande</th>
            <th>adresse</th>
            <th>Produit</th>
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Donnée 1-1</td>
            <td>Donnée 1-2</td>
            <td>Donnée 1-3</td><td>Donnée 1-4</td>
          </tr>
          <tr>
            <td>Donnée 2-1</td>
            <td>Donnée 2-2</td>
            <td>Donnée 2-3</td>
            <td>Donnée 2-4</td>
          </tr>
          <tr>
            <td>Donnée 3-1</td>
            <td>Donnée 3-2</td>
            <td>Donnée 3-3</td>
            <td>Donnée 3-4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableStyle;
