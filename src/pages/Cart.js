// Importing necessary libraries and components
import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';

// Defining the Cart component
const Cart = ({ cart, removeFromCart }) => {
  // Using useLocation hook to get the current location
  const location = useLocation();
  // Getting the token from local storage
  const token = localStorage.getItem('token');

  // If the user is not logged in, redirect them to the login page
  if (!token) {
    window.alert('You need to login to access the cart');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Function to remove all books from the cart
  const handleEmptyCart = () => {
    cart.forEach(book => removeFromCart(book._id));
  };

  // Rendering the Cart component
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Your Cart
            </Typography>
            {/* If the cart is empty, display a message. Otherwise, display the books in the cart */}
            {cart.length === 0 ? (
              <Typography variant="body2">
                Your cart is empty.
              </Typography>
            ) : (
              <>
                {cart.map(book => (
                  <Box key={book._id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e0e0e0', p: 1 }}>
                    <div>
                      <Typography variant="h6" component="div">{book.title}</Typography>
                      <Typography variant="body2">Author: {book.authors}</Typography>
                    </div>
                    {/* Button to remove the book from cart */}
                    <Button variant="contained" color="secondary" size="small" sx={{ mt: 1 }} onClick={() => removeFromCart(book._id)}>Remove from Cart</Button>
                  </Box>
                ))}
                {/* Buttons to empty the cart and go to checkout */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button variant="contained" color="secondary" size="small" sx={{ mt: 1 }} onClick={handleEmptyCart}>Empty Cart</Button>
                  <Button variant="contained" color="success" size="small" component={Link} to="/checkout">Go to Checkout</Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

// Mapping state to props
const mapStateToProps = (state) => ({
  cart: state.cart,
});

// Mapping dispatch to props
const mapDispatchToProps = {
  removeFromCart,
};

// Connecting the Cart component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
