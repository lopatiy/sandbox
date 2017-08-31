import articles from './articles';
import locations from './locations';
import {combineReducers} from 'redux';

export default combineReducers({
    locations,
    articles
});