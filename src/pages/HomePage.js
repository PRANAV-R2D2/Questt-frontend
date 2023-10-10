import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';

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
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} key={book.bookID}>
            <Card>
              <CardContent>
                <Link to={`/book/${book.bookID}`}>
                  <Typography variant="h5" component="div">{book.title}</Typography>
                </Link>
                <Typography>Author: {book.authors}</Typography>
                <Typography>Average Rating: {book.average_rating}</Typography>
                <Typography>ISBN: {book.isbn}</Typography>
                <Typography>Language: {book.language_code}</Typography>
                <Typography>Number of Pages: {book.num_pages}</Typography>
                <Typography>Publication Date: {new Date(book.publication_date).toLocaleDateString()}</Typography>
                <Typography>Publisher: {book.publisher}</Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(book)}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(HomePage);
