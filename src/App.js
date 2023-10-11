// Importing necessary libraries and components
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetails from './pages/BookDetails';
import SearchResults from './pages/SearchResults';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';

// Defining the App component
function App() {
  // Using useState hook to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Function to handle login
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    // Using the BrowserRouter (aliased as Router) to handle routing
    <Router>
      <div className="App">
        {/* Header component is displayed at the top of every page */}
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        {/* Routes component contains all the different routes of the app */}
        <Routes>
          {/* Each Route component represents a different page in the app */}
          {/* The path prop is the URL path, and the element prop is the component to render for that URL */}
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:bookID" element={<BookDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        {/* Footer component is displayed at the bottom of every page */}
        <Footer />
      </div>
    </Router>
  );
}

// Exporting the App component to be used in other parts of the app
export default App;
