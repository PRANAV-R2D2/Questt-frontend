// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';

// Defining the HomePage component
const HomePage = ({ addToCart }) => {
  // Using useState hook to manage books state
  const [books, setBooks] = useState([]);

  // Using useEffect hook to fetch books data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/api/books')
      .then(response => {
        // Setting the response data to books state
        setBooks(response.data);
      })
      .catch(error => {
        // Logging any error that occurs while fetching the data
        console.error('There was an error!', error);
      });
  }, []);

  // Rendering the HomePage component
  return (
    <div>
      <Grid container spacing={3}>
        {/* Mapping over the books array to render each book */}
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.bookID}>
            <Card>
              <CardContent>
                {/* Linking to the book details page */}
                <Link to={`/book/${book.bookID}`}>
                  <Typography variant="h5" component="div">{book.title}</Typography>
                </Link>
                {/* Displaying various details about the book */}
                <Typography>Author: {book.authors}</Typography>
                <Typography>Average Rating: {book.average_rating}</Typography>
                <Typography>ISBN: {book.isbn}</Typography>
                <Typography>Language: {book.language_code}</Typography>
                <Typography>Number of Pages: {book.num_pages}</Typography>
                <Typography>Publication Date: {new Date(book.publication_date).toLocaleDateString()}</Typography>
                <Typography>Publisher: {book.publisher}</Typography>
                {/* Button to add the book to cart */}
                <Button variant="contained" color="primary" onClick={() => addToCart(book)}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Mapping dispatch to props
const mapDispatchToProps = {
  addToCart,
};

// Connecting the HomePage component to Redux store
export default connect(null, mapDispatchToProps)(HomePage);
