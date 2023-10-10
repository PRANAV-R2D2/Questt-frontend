import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';

const Checkout = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, book) => total + 10, 0); // Assuming each book costs $10
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const orderData = {
      books: cart.map(book => ({
        bookID: book._id,
        title: book.title,
        authors: book.authors,
        // Add other book details here
      })),
    };

    const token = localStorage.getItem('token');

    console.log('Order Data:', orderData); // Log the order data before making the API call

    axios.post('http://localhost:3001/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('API Response:', response.data); // Log the API response after receiving it
        if (response.status === 200) {
          alert('Your order has been placed!');
          cart.forEach(book => removeFromCart(book._id));
          navigate('/');
        } else {
          alert('Failed to place the order.');
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('There was an error! ' + error);
      });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Checkout
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
                      <Typography color="text.secondary">Price: $10</Typography>
                    </div>
                    <Button variant="contained" color="secondary" size="small" sx={{ mt: 1 }} onClick={() => removeFromCart(book._id)}>Remove from Cart</Button>
                  </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="div">Total Price: ${totalPrice}</Typography>
                  <Button variant="contained" color="success" size="small" onClick={handlePlaceOrder}>Place Order</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
