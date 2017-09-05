import articles from './articles';
import videos from './videos';
import {combineReducers} from 'redux';
import { reducer as formReducer, } from 'redux-form';

export default combineReducers({
    articles,
    videos,
    form: formReducer
});