import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    userType: 'buyer'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/register', formData)
      .then(response => {
        console.log('Registration successful', response.data);
      })
      .catch(error => {
        console.error('There was an error registering!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" type="text" onChange={handleChange} placeholder="First Name" />
      <input name="lastName" type="text" onChange={handleChange} placeholder="Last Name" />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" />
      <input name="phone" type="text" onChange={handleChange} placeholder="Phone Number" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      <select name="userType" onChange={handleChange}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
