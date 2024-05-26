import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loginStatus, setLoginStatus] = useState('');
    const [token, setToken] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          console.log('Form data being sent:', form); // Debug: Log form data
          const response = await axios.post('http://13.233.174.37:5000/api/users/login', form);
          console.log('API Response:', response.data); // Debug: Log API response
    
          const { token, result } = response.data;
          const { userType } = result; // Extract userType from result
    
          if (token && userType) {
              // Token and userType are present in the response
              setToken(token);
              setUserType(userType); // Assuming you have a state variable for userType
              setLoginStatus('Logged in successfully!');
              console.log('Logged in successfully!', response.data);
    
              // Set isAuthenticated to true after successful login
              localStorage.setItem('isAuthenticated', true);
              localStorage.setItem('userType', userType);
              localStorage.setItem('userEmail', form.email);
              
              if (userType === 'buyer') {
                  navigate('/buyer');
              } else if (userType === 'seller') {
                  navigate('/seller');
              } else {
                  setLoginStatus('Invalid user role received.');
                  console.error('Invalid user role:', userType);
              }
          } else {
              // Handle case where either token or userType is missing
              setLoginStatus('Token or userType not provided in response.');
              console.error('Token or userType not provided in response.');
          }
      } catch (error) {
          // Handle error
          console.error('There was an error logging in!', error);
          setLoginStatus(`Error logging in: ${error.message || 'Please try again.'}`);
      }
    };
    const handleSignUp = () => {
        // Redirect to the sign-up page
        navigate('/register');
    };

  

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    New User? <Link component="button" variant="body2" onClick={handleSignUp}>Sign Up</Link>
                </Typography>
            {loginStatus && (
                <Alert severity={loginStatus.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>
                    {loginStatus}
                </Alert>
            )}
        </Container>
    );
};

export default Login;
