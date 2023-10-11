// Importing necessary libraries and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing CSS
import './index.css';

// Getting the root element to render our App
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App within React's StrictMode and Redux's Provider
// StrictMode is a wrapper component which checks the app's components for potential problems
// Provider makes the Redux store available to any nested components that have been wrapped in the connect() function
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Call to function reportWebVitals() which measures performance in the app
reportWebVitals();
