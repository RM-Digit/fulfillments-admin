import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // eslint-disable-next-line no-unused-vars
import Auth from "./Auth";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./_reducers";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";
import "./styles/components.css";
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);
console.log("windows URL", window.location.href)
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppProvider i18n={translations}>
        <Router history={history}>
          {/* <Auth Component={App} /> */}
          <App />
        </Router>
      </AppProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
