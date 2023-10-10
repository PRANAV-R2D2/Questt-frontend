import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer'; // updated this line

const store = createStore(cartReducer, applyMiddleware(thunk));

export default store;
