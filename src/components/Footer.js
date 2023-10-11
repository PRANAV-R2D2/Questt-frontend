// Importing necessary libraries
import React from 'react';

// Defining the Footer component
function Footer() {
  // Defining the style for the footer
  const footerStyle = {
    position: 'relative',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f9fa',
    color: 'black',
    textAlign: 'center',
    padding: '10px 0'
  };

  // Rendering the Footer component
  return (
    <footer style={footerStyle}>
      {/* Displaying the copyright notice */}
      <p>© 2023 My Bookstore. All rights reserved.</p>
      {/* You can add more footer elements here */}
    </footer>
  );
}

// Exporting the Footer component to be used in other parts of the app
export default Footer;
