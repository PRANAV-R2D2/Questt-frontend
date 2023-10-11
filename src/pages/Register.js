// Importing necessary libraries and components
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Defining the Register component
const Register = () => {
  // Using useState hook to manage firstname, lastname, email and password state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Making a POST request to the API to register
    axios.post('http://localhost:3001/api/users/register', { firstname, lastname, email, password })
      .then(response => {
        // If the request is successful, alert the user and store the token in local storage
        if (response.status === 200) {
          alert('Registration successful!');
          localStorage.setItem('token', response.data.token);
        } else {
          alert('Registration failed!');
        }
      })
      .catch(error => {
        // If there is an error, alert the user
        alert('There was an error! ' + error);
      });
  };

  // Rendering the Register component
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Register
            </Typography>
            {/* Form for firstname, lastname, email and password */}
            <form onSubmit={handleSubmit}>
              <TextField label="First Name" variant="outlined" type="text" value={firstname} onChange={e => setFirstname(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Last Name" variant="outlined" type="text" value={lastname} onChange={e => setLastname(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <Button variant="contained" color="primary" type="submit">Register</Button>
            </form>
            {/* Link to login page */}
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
