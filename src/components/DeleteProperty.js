import React from 'react';
import axios from 'axios';

const DeleteProperty = ({ token, title, onDelete }) => {
  const handleDelete = () => {
    axios.delete(`http://3.111.144.79:5000/api/properties/${title}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Property deleted:', response.data);
        // Update properties state after deletion
        onDelete(title);
      })
      .catch(error => {
        console.error('Error deleting property:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProperty;
