import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const BookComponent = ({ book, addToCart }) => (
  <div>
    <h2>{book.title}</h2>
    <button onClick={() => addToCart(book)}>Add to Cart</button>
  </div>
);

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(BookComponent);
