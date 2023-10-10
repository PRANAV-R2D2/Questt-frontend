import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Button, TextField, Grid, Card, CardContent, Typography, Box, Select, MenuItem } from '@mui/material';

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
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
        <Select value={searchType} onChange={e => setSearchType(e.target.value)} sx={{ mr: 2 }}>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="authors">Author</MenuItem>
          <MenuItem value="publisher">Publisher</MenuItem>
        </Select>
        <TextField label="Search" variant="outlined" type="text" value={query} onChange={e => setQuery(e.target.value)} sx={{ mr: 2, width: '50%' }} />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </Box>

      {/* Display search results here */}
      <Grid container spacing={3}>
        {results.map(result => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={result._id}>
            <Card sx={{ minWidth: 275, backgroundColor: '#f5f5f5', m: 3 }}>
              <CardContent>
                <Typography variant="h6" component="div">{result.title}</Typography>
                <Typography variant="body2">Author: {result.authors}</Typography>
                <Typography color="text.secondary">Publisher: {result.publisher}</Typography>
                {/* Display other result details */}
                <Button variant="contained" color="secondary" size="small" sx={{ mt: 1 }} onClick={() => addToCart(result)}>Add to Cart</Button>
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

export default connect(null, mapDispatchToProps)(Search);
