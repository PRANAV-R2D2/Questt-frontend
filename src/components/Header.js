// Importing necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

// Defining the Header component
function Header({ isLoggedIn, onLogout }) {
  // Rendering the Header component
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Link to the home page */}
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            My Bookstore
          </Typography>
        </Link>
        {/* Link to the cart page */}
        <Link to="/cart" style={{ marginRight: '10px' }}>
          <Button variant="contained" color="secondary">View Cart</Button>
        </Link>
        {/* If the user is logged in (i.e., isLoggedIn is true), display the Logout button. Otherwise, display the Login button */}
        {isLoggedIn ? (
          <Button variant="contained" color="secondary" onClick={onLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button variant="contained" color="primary">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Exporting the Header component to be used in other parts of the app
export default Header;
