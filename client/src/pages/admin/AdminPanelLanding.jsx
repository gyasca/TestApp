import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

function AdminPanelLanding() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5rem',
      }}
    >
      <Typography sx={{ marginBottom: '2rem', fontSize: '3rem', textAlign: 'center' }}>
        Admin Panel Landing Page
      </Typography>
      <Button
        component={Link}
        to="/admin/employees"
        variant="contained"
        color="primary"
        // sx={{ marginBottom: '1rem', width: '80%', height: '100px', fontSize: '2.5rem' }}
      >
        View Employees
      </Button>
      <br />
      <Button
        component={Link}
        to="/admin/register"
        variant="contained"
        color="primary"
        // sx={{ marginBottom: '1rem', width: '80%', height: '100px', fontSize: '2.5rem' }}
        >
        Register New Employee
      </Button>
    </Box>
  );
}

export default AdminPanelLanding;
