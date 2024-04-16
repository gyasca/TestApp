import React, { useEffect } from 'react';
import { Container, Box, Paper, Typography, Grid, Button, IconButton } from '@mui/material';
import {
  DateRange,
  EventAvailable,
  FlightTakeoff,
  Weekend,
  EventBusy,
  LaptopMac,
  Mail,
  People,
  Cake,
  EmojiPeople,
  MonetizationOn,
} from '@mui/icons-material';

const App = () => {
  useEffect(() => {
    document.title = 'Home - HRTestApp';
  }, []);

  // Dummy data for indicators
  const indicators = [
    { label: 'Present', count: 10, color: 'green' },
    { label: 'Absent', count: 2, color: 'red' },
    { label: 'Weekend', count: 1, color: 'brown' },
    { label: 'Leave', count: 3, color: 'orange' },
    { label: 'Visit', count: 5, color: 'blue' },
  ];

  return (
    <Container maxWidth="xl" sx={{ marginTop: '1rem' }}>
      <Box marginBottom="20px">
        {/* First Paper Component */}
        <Paper elevation={0} style={{ padding: '20px', backgroundColor: '#FEE9D7' }}>
          <Typography variant="h6" gutterBottom>
            <DateRange /> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })},{' '}
            {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
          </Typography>
        </Paper>
      </Box>

      <Box marginBottom="20px">
        {/* Second Paper Component */}
        <Paper elevation={0} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FEE9D7' }}>
          <Grid container spacing={2} justifyContent="space-around">
            {indicators.map((indicator, index) => (
              <Grid item key={index} xs={2}>
                <Typography variant="h4" style={{ color: indicator.color }}>{indicator.count}</Typography>
                <Typography sx={{ fontSize: '0.6rem'}}>{indicator.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>

      <Box marginBottom="20px">
        {/* Third Paper Component */}
        <Paper elevation={0} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FEE9D7' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <IconButton>
                <EventAvailable fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Attendance</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <FlightTakeoff fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Late/Early</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <Weekend fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Leave</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <LaptopMac fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Visit</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <Mail fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Inbox</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <People fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">People</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <Cake fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Birthday</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <EmojiPeople fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Contract</Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <MonetizationOn fontSize="large" />
              </IconButton>
              <Typography variant="subtitle1">Payslip</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* <Box marginBottom="20px">
        <Paper elevation={0} style={{ padding: '10px', textAlign: 'center', backgroundColor: 'lightgoldenrodyellow' }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" sx={{ width: '150px' }}>Home</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ width: '150px' }}>Holidays</Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" sx={{ width: '150px' }}>Submit Attendance</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" sx={{ width: '150px' }}>Recent</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" sx={{ width: '150px' }}>Contacts</Button>
                </Grid>
              </Grid>
            </Paper>
          </Box> */}
        </Container>
      );
    };
    
    export default App;
    