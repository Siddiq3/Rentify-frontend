import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default Pagination;
