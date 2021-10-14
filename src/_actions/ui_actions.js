import { TOGGLE_TOAST } from "./type";

export function toggleToast(message = "Updated Successfully!") {
  return {
    type: TOGGLE_TOAST,
    payload: message,
  };
}
