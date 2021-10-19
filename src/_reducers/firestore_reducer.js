import {
  FETCH_ALL,
  UPDATE_DOC,
  UPDATE_BULK,
  BULK_EDITOR,
} from "../_actions/type";

export default function fetchReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, tableData: action.payload };
    case UPDATE_DOC:
      return {
        ...state,
        updated_data: action.payload.updated_data,
        tableData: action.payload.tableData,
      };
    case UPDATE_BULK:
      return {
        ...state,
        updated_data: action.payload.updated_data,
        tableData: action.payload.tableData,
      };
    case BULK_EDITOR:
      return {
        ...state,
        tableData: action.payload.tableData,
      };
    default:
      return state;
  }
}
