export default function (state = {place:'globalFeed'}, action) {
    switch (action.type) {
        case 'CHANGE_PLACE' :
            return {...state, place: action.payload};
        default :
            return state;
    }
}