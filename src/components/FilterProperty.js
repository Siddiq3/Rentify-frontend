import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Tooltip, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const FilterProperties = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    minBedrooms: '',
    maxRent: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // Call the onFilter function with current filters
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Filter Properties</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <Tooltip title="Enter the location you are looking for" arrow>
            <TextField
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Tooltip title="Minimum number of bedrooms" arrow>
            <TextField
              label="Min Bedrooms"
              type="number"
              name="minBedrooms"
              value={filters.minBedrooms}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BedIcon />
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
              }}
            />
          </Tooltip>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Tooltip title="Maximum rent you are willing to pay" arrow>
            <TextField
              label="Max Rent"
              type="number"
              name="maxRent"
              value={filters.maxRent}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
              }}
            />
          </Tooltip>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Apply Filters
        </Button>
      </form>
    </Box>
  );
};

export default FilterProperties;
