import { TOGGLE_TOAST, SWITCH_VIEW } from "../_actions/type";
// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = { showToast: false, toastText: "", view: { mode: "main", ids: [] } },
  action
) {
  console.log("action type", action.type);
  switch (action.type) {
    case TOGGLE_TOAST:
      return {
        ...state,
        showToast: !state.showToast,
        toastText: action.payload,
      };
    case SWITCH_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
}
