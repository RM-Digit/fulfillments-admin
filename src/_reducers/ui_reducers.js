import { TOGGLE_TOAST, SWITCH_VIEW , SAVE_FILTER} from "../_actions/type";
// eslint-disable-next-line import/no-anonymous-default-export
export default function (
  state = { showToast: false, toastText: "", view: { mode: "main", ids: [] } },
  action
) {
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
    case SAVE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
