import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import Login from './components/login';
  import SignUp from './components/signUp';
  import Home from './components/home';
  import PrivateRoute from './auth/privateRoute';
  import AuthRoute from './auth/authRoute';
  import Dashboard from './components/dashboard';

function Routes() {
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={PrivateRoute(Dashboard)} />
            <Route exact path="/login" component={AuthRoute(Login)} />
            <Route exact path="/signup" component={AuthRoute(SignUp)} />
          </Switch>
        </Router>
    )
}

export default Routes
