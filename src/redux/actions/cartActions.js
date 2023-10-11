// Defining action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Action creator for adding a book to the cart
// It returns an action of type ADD_TO_CART with the book as the payload
export const addToCart = (book) => ({
  type: ADD_TO_CART,
  payload: book,
});

// Action creator for removing a book from the cart
// It returns an action of type REMOVE_FROM_CART with the bookId as the payload
export const removeFromCart = (bookId) => ({
  type: REMOVE_FROM_CART,
  payload: bookId,
});
