import React from 'react';
import axios from 'axios';

const DeleteUser = ({ user, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/users/${user.id}`)
      .then((response) => {
        console.log('Utilisateur supprimé:', response.data);
        onDelete();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      });
    // console.log('Utilisateur supprimé:', user);
    onDelete();
  };

  return (
    <div>
      <h2>Supprimer un utilisateur</h2>
      <p>Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.pseudo}" ?</p>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default DeleteUser;
