import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/users/register', { firstname, lastname, email, password })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token); 
        // alert(response.data); // Display an alert with the response data
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('There was an error! ' + error); // Display an alert with the error message
      });
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="First Name" variant="outlined" type="text" value={firstname} onChange={e => setFirstname(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Last Name" variant="outlined" type="text" value={lastname} onChange={e => setLastname(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <Button variant="contained" color="primary" type="submit">Register</Button>
            </form>
            <Box sx={{ mt: 2 }}>
              Already registered? <Link to="/login">Click here</Link> to login.
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
