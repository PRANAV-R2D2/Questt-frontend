import React from 'react';

function Footer() {
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

  return (
    <footer style={footerStyle}>
      <p>© 2023 My Bookstore. All rights reserved.</p>
      {/* You can add more footer elements here */}
    </footer>
  );
}

export default Footer;
