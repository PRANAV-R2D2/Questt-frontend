import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { Link, Navigate, useLocation } from 'react-router-dom';

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
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(book => (
            <div key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.authors}</p>
              <button onClick={() => removeFromCart(book._id)}>Remove from Cart</button>
            </div>
          ))}
          <button onClick={handleEmptyCart}>Empty Cart</button>
          <Link to="/checkout">Go to Checkout</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
