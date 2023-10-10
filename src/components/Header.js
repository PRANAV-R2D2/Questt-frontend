import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            My Bookstore
          </Typography>
        </Link>
        <Link to="/cart" style={{ marginRight: '10px' }}>
          <Button variant="contained" color="secondary">View Cart</Button>
        </Link>
        {localStorage.getItem('token') ? (
          <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button variant="contained" color="primary">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
