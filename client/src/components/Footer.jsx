import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';

export function Footer() {
  return (
    <Box position="fixed" bottom={0} width="100%" bgcolor="#f0f0f0" boxShadow="0px -2px 8px rgba(0, 0, 0, 0.1)" zIndex={99999}>
      <Grid container justifyContent="space-around" alignItems="center" padding={0}>
        <Grid item>
          <Button variant="text" color="primary" sx={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem' }}>
            <HomeIcon sx={{ fontSize: 24 }} />
            Home
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" sx={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem' }}>
            <EventIcon sx={{ fontSize: 24 }} />
            Holidays
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" sx={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', fontSize: '0.6rem' }}>
            <FingerprintIcon sx={{ fontSize: 24 }} />
            Submit<br />Attendance
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" sx={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem' }}>
            <TrendingUpIcon sx={{ fontSize: 24 }} />
            Recent
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="primary" sx={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem' }}>
            <PersonIcon sx={{ fontSize: 24 }} />
            Contacts
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
