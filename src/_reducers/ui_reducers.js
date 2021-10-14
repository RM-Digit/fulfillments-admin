import { TOGGLE_TOAST } from "../_actions/type";
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { showToast: false, toastText: "" }, action) {
  switch (action.type) {
    case TOGGLE_TOAST:
      return {
        ...state,
        showToast: !state.showToast,
        toastText: action.payload,
      };
    default:
      return state;
  }
}
