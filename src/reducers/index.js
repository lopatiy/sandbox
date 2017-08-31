import articles from './articles';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    articles
});