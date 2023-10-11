// Importing necessary libraries and middleware
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Importing the cart reducer
import cartReducer from './reducers/cartReducer';

// Creating the Redux store with the cart reducer and thunk middleware
// The createStore function is used to create the Redux store. It takes the root reducer function as its first argument.
// applyMiddleware is a Redux method that allows us to use middleware (like thunk) with our Redux store.
const store = createStore(cartReducer, applyMiddleware(thunk));

// Exporting the store to be used in other parts of the app
export default store;
