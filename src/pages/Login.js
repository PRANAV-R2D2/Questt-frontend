import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/users/login', { email, password })
      .then(response => {
        if (response.status === 200) {
          alert('Login successful!');
          localStorage.setItem('token', response.data.token);
          navigate('/'); // Redirect to home page
        } else {
          alert('Login failed!');
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('There was an error! ' + error);
      });
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} fullWidth />
              <Button variant="contained" color="primary" type="submit">Login</Button>
            </form>
            <Box sx={{ mt: 2 }}>
              Don't have an account? <Link to="/register">Click here</Link> to register.
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
