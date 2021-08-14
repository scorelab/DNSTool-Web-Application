import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/login';
import SignUp from './components/signUp';
import Home from './components/home';
import AuthRoute from './auth/authRoute';
import Dashboard from './components/dashboard';
import VerifyEmail from './components/EmailVerfication';
import PrivateIsNotVerifiedRoute from './auth/privateRouteIsNotVerfied';
import PrivateIsVerifiedRoute from './auth/privateRouteIsVerified';
import NotFound from './components/notFound';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/verify-email" component={PrivateIsNotVerifiedRoute(VerifyEmail)} />
        <Route exact path="/dashboard" component={PrivateIsVerifiedRoute(Dashboard)} />
        <Route exact path="/login" component={AuthRoute(Login)} />
        <Route exact path="/signup" component={AuthRoute(SignUp)} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes
