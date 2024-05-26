import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

const UpdateProperty = ({ token, property, onUpdate, title }) => {
  const [form, setForm] = useState({
    title: property.title,
    description: property.description,
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    rent: property.rent,
    seller: property.seller
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://13.233.174.37:5000/api/properties/${title}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Property updated:', response.data);
        // Update properties state after update
        onUpdate(response.data);
      })
      .catch(error => {
        console.error('Error updating property:', error);
      });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px' }}>
      <Typography variant="h5" gutterBottom>Update Property</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Bedrooms"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Bathrooms"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Rent"
              name="rent"
              value={form.rent}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Seller"
              name="seller"
              value={form.seller}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Update Property</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UpdateProperty;
