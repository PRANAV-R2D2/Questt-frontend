// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';

// Defining the BookDetails component
const BookDetails = ({ addToCart }) => {
  // Using useState hook to manage book state
  const [book, setBook] = useState({});
  // Using useParams hook to get the bookID from the URL
  const { bookID } = useParams();

  // Using useEffect hook to fetch book data when the component mounts or bookID changes
  useEffect(() => {
    if (bookID && !isNaN(bookID)) {
      axios.get(`http://localhost:3001/api/books/${bookID}`)
        .then(response => {
          // Setting the response data to book state
          setBook(response.data.book);
        })
        .catch(error => {
          // Logging any error that occurs while fetching the data
          console.error('There was an error!', error);
        });
    } else {
      console.error(`Invalid bookID: ${bookID}`);
    }
  }, [bookID]);

  // Rendering the BookDetails component
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275, backgroundColor: 'action.hover', m: 3 }}>
          <CardContent>
            {/* Displaying various details about the book */}
            <Typography variant="h5" component="div" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="body2">
              Author: {book.authors}
            </Typography>
            <Typography color="text.secondary">
              Average Rating: {book.average_rating}
            </Typography>
            <Typography variant="body2">
              ISBN: {book.isbn}
            </Typography>
            <Typography color="text.secondary">
              Language: {book.language_code}
            </Typography>
            <Typography variant="body2">
              Number of Pages: {book.num_pages}
            </Typography>
            <Typography color="text.secondary">
              Publication Date: {new Date(book.publication_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Publisher: {book.publisher}
            </Typography>
            {/* Button to add the book to cart */}
            <Button variant="contained" color="primary" onClick={() => addToCart(book)}>Add to Cart</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

// Mapping dispatch to props
const mapDispatchToProps = {
  addToCart,
};

// Connecting the BookDetails component to Redux store
export default connect(null, mapDispatchToProps)(BookDetails);
