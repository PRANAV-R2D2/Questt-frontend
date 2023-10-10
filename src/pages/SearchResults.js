import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const Search = ({ addToCart }) => {
  const [searchType, setSearchType] = useState('title');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:3001/api/books/search/${searchType}/${query}`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div>
      <Link to="/cart">View Cart</Link>
      <select onChange={e => setSearchType(e.target.value)}>
        <option value="title">Title</option>
        <option value="authors">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <input type="text" onChange={e => setQuery(e.target.value)} />

      <button onClick={handleSearch}>Search</button>

      {/* Display search results here */}
      {results.map(result => (
        <div key={result._id}>
          <h2>{result.title}</h2>
          <p>Author: {result.authors}</p>
          <p>Publisher: {result.publisher}</p>
          {/* Display other result details */}
          <button onClick={() => addToCart(result)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(Search);