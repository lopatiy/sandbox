import defaultState from '../store/state';
import a from '../actions';

export default function (state = defaultState, action) {
    switch (action.type) {
        case a.video.UPLOADED_LOADED :
            return {...state, uploadedList: action.payload};
        case a.video.PROGRESS_CHANGED:
            return {...state, progress: action.payload};
        default :
            return state;
    }
}