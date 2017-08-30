import defaultState from './state';

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'HOME_PAGE_LOADED' :
            return {...state, articles: action.payload.articles};
        default:
            return {...state};
    }
}