import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';
import reducers from './reducers';

export default createStore(reducers, applyMiddleware(promiseMiddleware));