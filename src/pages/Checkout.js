// Importing necessary libraries and components
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';

// Defining the Checkout component
const Checkout = ({ cart, removeFromCart }) => {
  // Calculating the total price of the books in the cart (assuming each book costs $10)
  const totalPrice = cart.reduce((total, book) => total + 10, 0);
  // Using useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle placing the order
  const handlePlaceOrder = () => {
    // Preparing the order data
    const orderData = {
      books: cart.map(book => ({
        bookID: book._id,
        title: book.title,
        authors: book.authors,
        // Add other book details here
      })),
    };

    // Getting the token from local storage
    const token = localStorage.getItem('token');

    // Making a POST request to the API to place the order
    axios.post('http://localhost:3001/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // If the request is successful, alert the user and empty the cart
        if (response.status === 200) {
          alert('Your order has been placed!');
          cart.forEach(book => removeFromCart(book._id));
          navigate('/');
        } else {
          alert('Failed to place the order.');
        }
      })
      .catch(error => {
        // If there is an error, alert the user
        alert('There was an error! ' + error);
      });
  };

  // Rendering the Checkout component
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Checkout
            </Typography>
            {/* If the cart is empty, display a message. Otherwise, display the books in the cart and the total price */}
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
                    {/* Button to remove the book from cart */}
                    <Button variant="contained" color="secondary" size="small" sx={{ mt: 1 }} onClick={() => removeFromCart(book._id)}>Remove from Cart</Button>
                  </Box>
                ))}
                {/* Displaying total price and button to place order */}
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

// Mapping state to props
const mapStateToProps = (state) => ({
  cart: state.cart,
});

// Mapping dispatch to props
const mapDispatchToProps = {
  removeFromCart,
};

// Connecting the Checkout component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
