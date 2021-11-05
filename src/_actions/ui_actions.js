import { TOGGLE_TOAST,SAVE_FILTER } from "./type";

export function toggleToast(message = "Updated Successfully!") {
  return {
    type: TOGGLE_TOAST,
    payload: message,
  };
}

export function saveFilter(filter) {
  return {
    type: SAVE_FILTER,
    payload: filter,
  };
}
