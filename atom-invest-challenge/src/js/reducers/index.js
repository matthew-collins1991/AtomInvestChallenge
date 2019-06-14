import { ADD_ARTICLE } from "../constants/action-types";
const initialState = {
  userData: []
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      userData: state.userData.concat(action.payload)
    });
  }
  return state;
}
export default rootReducer;