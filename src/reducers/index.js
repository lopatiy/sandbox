import articles from './articles';
import {combineReducers} from 'redux';
import { reducer as formReducer, } from 'redux-form';

export default combineReducers({
    articles,
    form: formReducer
});