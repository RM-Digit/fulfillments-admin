import Home from "./pages";
import { Switch, Route } from "react-router-dom";
import Loader from "./components/loading";
import Login from "./pages/login";
import { connect } from "react-redux";
import React, { Suspense } from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { initializing, user } = useAuth();

  return !initializing ? (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={user ? Home : Login} />
        <Home />
      </Switch>
    </Suspense>
  ) : (
    <Loader />
  );
};

export default connect((state, ownProps) => ({
  user: state.user,
}))(App);
