import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const AddProperty = ({ token }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    rent: 0,
    nearby:'',
    address:'',
    seller: '' 
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://13.233.174.37:5000/api/properties', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setMessage('Property added successfully!');
      console.log('Property added!', response.data);
      setForm({
        title: '',
        description: '',
        location: '',
        bedrooms: 0,
        bathrooms: 0,
        rent: 0,
        nearby:'',
        address:'',
        seller: ''
      });
    })
    .catch(error => {
      setError('Error adding property. Please try again.');
      console.error('There was an error adding the property!', error);
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Property</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              variant="outlined"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bedrooms"
              variant="outlined"
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bathrooms"
              variant="outlined"
              type="number"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rent"
              variant="outlined"
              type="number"
              name="rent"
              value={form.rent}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nearby"
              variant="outlined"
              name="nearby"
              value={form.nearby}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Seller"
              variant="outlined"
              name="seller"
              value={form.seller}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Property
            </Button>
          </Grid>
        </Grid>
      </Box>
      {message && <Typography variant="body1" color="success">{message}</Typography>}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
    </Container>
  );
};

export default AddProperty;
