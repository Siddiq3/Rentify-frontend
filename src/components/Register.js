import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, MenuItem, Alert, Box } from '@mui/material';
import { useNavigate ,Link } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        userType: 'buyer'
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          console.log('Form Data:', form);  // Log form data
          const response = await axios.post('http://13.233.174.37:5000/api/users/register', form, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          console.log('Server Response:', response);  // Log server response
          
          // Store token in local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('userType', form.userType);
          console.log( form.userType)
          setMessage('Registered successfully!');
          setError('');
          
          // Redirect based on user type after successful registration
          if (form.userType === 'buyer') {
              navigate('/buyer'); // Redirect to Buyer Dashboard
          } else if (form.userType === 'seller') {
              navigate('/seller'); // Redirect to Seller Dashboard
          }
      } catch (error) {
          console.error('Error:', error);  // Log detailed error
          if (error.response) {
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
          }
          setError('Error registering. Please try again.');
          setMessage('');
      }
  };
  const handleSignUp = () => {
    // Redirect to the sign-up page
    navigate('/login');
};
    return (
      <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>Register</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
              />
              <TextField
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
              />
              <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
              />
              <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
              />
              <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
              />
              <TextField
                  label="Role"
                  name="userType"
                  value={form.userType}
                  onChange={handleChange}
                  select
                  fullWidth
                  margin="normal"
              >
                  <MenuItem value="buyer">Buyer</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Register
              </Button>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    already user? <Link component="button" variant="body2" onClick={handleSignUp}>Login</Link>
                </Typography>
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Container>
  );
};

export default Register;