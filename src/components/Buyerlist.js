import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './LikeButton';

import FilterProperties from './FilterProperty';
import Pagination from './Pagination';
import { Card, CardContent, Typography, Grid, Button, Container, Box, CircularProgress, Alert, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './PropertyListByuer.css';
import { useNavigate } from 'react-router-dom';


const PropertyListByuer = ({ token }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [showSellerDetails, setShowSellerDetails] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); 
  useEffect(() => {
    axios.get('http://13.233.174.37:5000/api/properties')
      .then(response => {
        setProperties(response.data);
        setFilteredProperties(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching properties. Please try again later.');
        setLoading(false);
        console.error('Error fetching properties:', error);
      });
  }, []);

  useEffect(() => {
    const userToken = localStorage.getItem('isAuthenticated');
    setLoggedIn(!!userToken);
  }, []);

  const handleInterestedClick = (property) => {
    if (loggedIn) {
      axios.get(`http://13.233.174.37:5000/api/properties/seller/${property.title}`)
        .then(response => {
          setSellerDetails(response.data);
          setShowSellerDetails(true); // Show the modal when seller details are fetched
        })
        .catch(error => {
          console.error('Error fetching seller details:', error);
        });
    } else {
      navigate('/register');
    }
  };

  const handleFilter = (filters) => {
    const filtered = properties.filter(property => {
      let pass = true;
      if (filters.location && property.location.toLowerCase().indexOf(filters.location.toLowerCase()) === -1) {
        pass = false;
      }
      if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) {
        pass = false;
      }
      if (filters.maxRent && property.rent > filters.maxRent) {
        pass = false;
      }
      if (filters.nearby && property.nearby.toLowerCase().indexOf(filters.nearby.toLowerCase()) === -1) {
        pass = false;
      }
      if (filters.address && property.address.toLowerCase().indexOf(filters.address.toLowerCase()) === -1) {
        pass = false;
      }
      return pass;
    });
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Available Properties
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
      ) : (
        <>
          <FilterProperties onFilter={handleFilter} />
          <Grid container spacing={4} mt={3}>
            {currentProperties.map(property => (
              <Grid item key={property._id} xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Location:</strong> {property.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Bedrooms:</strong> {property.bedrooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Bathrooms:</strong> {property.bathrooms}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Rent:</strong> ${property.rent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>NearBy:</strong> {property.seller.nearby} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Address:</strong> {property.seller.address} 
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <LikeButton />
                      <Button variant="contained" color="primary" onClick={() => handleInterestedClick(property)}>
                        I'm Interested
                      </Button>
                    </Box>
                  
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProperties.length / propertiesPerPage)}
              onPageChange={paginate}
            />
          </Box>
        </>
      )}
      <Modal
        open={showSellerDetails}
        onClose={() => setShowSellerDetails(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Seller Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Name:</strong> {sellerDetails?.result.firstName} {sellerDetails?.result.lastName}<br />
            <strong>Email:</strong> {sellerDetails?.result.email}<br />
            <strong>Phone:</strong> {sellerDetails?.result.phoneNumber}
          </Typography>
          <IconButton aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => setShowSellerDetails(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Container>
  );
};

export default PropertyListByuer;
