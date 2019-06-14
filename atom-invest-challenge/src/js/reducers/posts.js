
import * as actionTypes from "../constants/action-types";

function postsReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_POSTS:
            return [...state, ...action.payload]
            case actionTypes.DELETE_POST:
            return state.filter( (data) => data.id !== action.id);
        default:
            return state
    }
}

export default postsReducer
