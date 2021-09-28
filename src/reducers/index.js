import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import UIReducer from "./UIReducer";


const rootReducer = combineReducers({
  ui: UIReducer,
  products: ProductReducer,

});

export default rootReducer;
