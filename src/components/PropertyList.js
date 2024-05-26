import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Divider, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateProperty from './UpdateProperty'; // Assuming the UpdateProperty component is in a separate file

const PropertyList = ({ token }) => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null); // State to track selected property for editing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log( localStorage.getItem('userEmail'))
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const response = await axios.get(`http://13.233.174.37:5000/api/properties/${userEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProperties(response.data);
      } catch (error) {
        setError('Error fetching properties. Please try again later.');
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token]);

  const handleDelete = async (title) => {
    try {
      await axios.delete(`http://13.233.174.37:5000/api/properties/${title}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update state after successful delete
      setProperties(properties.filter(property => property.title !== title));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleEdit = (property) => {
    setSelectedProperty(property); // Set selected property for editing
  };

  const handleUpdate = async (updatedProperty) => {
    try {
      await axios.put(`http://13.233.174.37:5000/api/properties/${updatedProperty.title}`, updatedProperty, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update state after successful update
      setProperties(properties.map(property => {
        if (property.title === updatedProperty.title) {
          return updatedProperty;
        }
        return property;
      }));
      setSelectedProperty(null); // Reset selected property after update
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Your Properties</Typography>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : error ? (
        <Typography variant="body1">{error}</Typography>
      ) : properties.length > 0 ? (
        <>
          {selectedProperty ? ( // Conditionally render UpdateProperty if a property is selected for editing
            <UpdateProperty token={token} property={selectedProperty} onUpdate={handleUpdate} title={selectedProperty.title} />
          ) : (
            <Paper elevation={3}>
              <List>
                {properties.map((property, index) => (
                  <React.Fragment key={property._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={property.title}
                        secondary={
                          <>
                            <Typography variant="body2" color="textPrimary">
                              {property.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Location: {property.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Bedrooms: {property.bedrooms}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Bathrooms: {property.bathrooms}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Rent: {property.rent}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Seller: {property.seller}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(property)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(property.title)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index !== properties.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}
        </>
      ) : (
        <Typography variant="body1">No properties found.</Typography>
      )}
    </div>
  );
};

export default PropertyList;
