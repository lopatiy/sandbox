import {applyMiddleware, createStore} from 'redux';
import {promiseMiddleware} from '../middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import defaultState from './state';

export default createStore(
    combinedReducers,
    defaultState,
    applyMiddleware(thunk, logger, promiseMiddleware)
);