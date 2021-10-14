import { combineReducers } from "redux";
import fireStoreReducer from "./firestore_reducer";
import userReducer from "./user_reducer";
import uiReducer from "./ui_reducers";
const rootReducer = combineReducers({
  data: fireStoreReducer,
  ui: uiReducer,
  user: userReducer,
});

export default rootReducer;
