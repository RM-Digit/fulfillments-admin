import { LOGIN_USER } from "../_actions/type";

export default function fetchReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
