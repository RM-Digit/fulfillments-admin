import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Auth from "./Auth";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
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
// const sagaMiddleware = createSagaMiddleware();

// const middlewareList = [sagaMiddleware, thunk];
// const composedEnhancer = composeWithDevTools(
//   applyMiddleware(...middlewareList)
// );

// const store = createStore(rootReducer, composedEnhancer);

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <AppProvider i18n={translations}>
    <Provider store={store}>
      <BrowserRouter>
        <Router history={history}>
          <App />
        </Router>
      </BrowserRouter>
    </Provider>
  </AppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
