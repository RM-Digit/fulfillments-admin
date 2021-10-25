import Home from "./pages";
import { Switch, Route, withRouter } from "react-router-dom";
import Loader from "./components/loading";
import Login from "./pages/login";
import { connect } from "react-redux";
import React, { Suspense } from "react";
import useAuth from "./hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { toggleToast } from "./_actions/ui_actions";
import { Toast, Frame } from "@shopify/polaris";

const App = () => {
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { initializing, user } = useAuth();

  return !initializing ? (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" component={user ? Home : Login} />
      </Switch>
      {ui.showToast ? (
        <Frame>
          <Toast
            content={ui.toastText}
            onDismiss={() => dispatch(toggleToast())}
          />
        </Frame>
      ) : null}
    </Suspense>
  ) : (
    <Loader />
  );
};

export default withRouter(
  connect(
    (state, ownProps) => ({
      ui: state.ui,
      user: state.user,
    }),
    {
      toggleToast,
    }
  )(App)
);
