import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';

const BookDetails = ({ addToCart }) => {
  const [book, setBook] = useState({});
  const { bookID } = useParams();

  useEffect(() => {
    if (bookID && !isNaN(bookID)) {
      console.log(bookID);

      axios.get(`http://localhost:3001/api/books/${bookID}`)

        .then(response => {
          setBook(response.data.book);
          console.log(response.data.book)
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      console.error(`Invalid bookID: ${bookID}`);
    }
  }, [bookID]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275, backgroundColor: 'action.hover', m: 3 }}>
          <CardContent>
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
            <Button variant="contained" color="primary" onClick={() => addToCart(book)}>Add to Cart</Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(BookDetails);
