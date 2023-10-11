// Importing necessary libraries and components
import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

// Defining the BookComponent component
const BookComponent = ({ book, addToCart }) => (
  <div>
    {/* Displaying the book title */}
    <h2>{book.title}</h2>
    {/* Button to add the book to cart */}
    <button onClick={() => addToCart(book)}>Add to Cart</button>
  </div>
);

// Mapping dispatch to props
const mapDispatchToProps = {
  addToCart,
};

// Connecting the BookComponent component to Redux store
export default connect(null, mapDispatchToProps)(BookComponent);
