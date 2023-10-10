import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const HomePage = ({ addToCart }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/books')
      .then(response => {
        console.log(response.data)
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <Link to="/cart">View Cart</Link>
      {books.map(book => (
        <div key={book._id}>
          <h2>{book.title}</h2>
          <p>Author: {book.authors}</p>
          <p>Average Rating: {book.average_rating}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Language: {book.language_code}</p>
          <p>Number of Pages: {book.num_pages}</p>
          <p>Publication Date: {new Date(book.publication_date).toLocaleDateString()}</p>
          <p>Publisher: {book.publisher}</p>
          <button onClick={() => addToCart(book)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(HomePage);
