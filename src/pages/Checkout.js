import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, book) => total + 10, 0); // Assuming each book costs $10
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert('Your order has been placed!');
    // Clear the cart
    cart.forEach(book => removeFromCart(book._id));
    // Redirect to the homepage
    navigate('/');
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
              {/* Display other book details */}
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
