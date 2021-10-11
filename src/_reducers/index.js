import { combineReducers } from "redux";
import fireStoreReducer from "./firestore_reducer";
import userReducer from "./user_reducer";
const rootReducer = combineReducers({
  data: fireStoreReducer,
  user: userReducer,
});

export default rootReducer;
