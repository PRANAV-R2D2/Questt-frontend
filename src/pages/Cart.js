import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';

const Cart = ({ cart, removeFromCart }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    window.alert('You need to login to access the cart');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const handleEmptyCart = () => {
    // Remove all books from the cart
    cart.forEach(book => removeFromCart(book._id));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Your Cart
            </Typography>
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
                    <Button variant="contained" color="secondary" size="small" sx={{ mt: 1 }} onClick={() => removeFromCart(book._id)}>Remove from Cart</Button>
                  </Box>
                ))}
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

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
