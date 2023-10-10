import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(book => (
            <div key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.authors}</p>
              <p>Price: $10</p>
              <button onClick={() => removeFromCart(book._id)}>Remove from Cart</button>
            </div>
          ))}
          <h2>Total Price: ${totalPrice}</h2>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
