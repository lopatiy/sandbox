export default function (state = [], action) {
    switch (action.type) {
        case 'HOME_PAGE_LOADED' :
            return action.payload.articles;
        default :
            return state;
    }
}