export default function (state = [], action) {
    switch (action.type) {
        case 'VIDEOS_PAGE_LOADED' :
            return action.payload;
        default :
            return state;
    }
}