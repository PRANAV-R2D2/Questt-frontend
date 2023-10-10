export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (book) => ({
  type: ADD_TO_CART,
  payload: book,
});

export const removeFromCart = (bookId) => ({
  type: REMOVE_FROM_CART,
  payload: bookId,
});
