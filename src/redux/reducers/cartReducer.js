// Importing action types
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

// Defining the initial state
const initialState = {
  cart: [],
};

// Defining the cart reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // If the action is ADD_TO_CART, add the payload to the cart array in the state
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    // If the action is REMOVE_FROM_CART, remove the payload from the cart array in the state
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((book) => book._id !== action.payload),
      };
    // If the action does not match any cases, return the current state
    default:
      return state;
  }
};

// Exporting the cart reducer to be used in other parts of the app
export default cartReducer;
