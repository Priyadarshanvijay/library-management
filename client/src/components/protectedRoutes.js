import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLoggedIn, isUserLoggedIn } from './isLoggedIn';

const UserProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isUserLoggedIn ?
      <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAdminLoggedIn ?
      <Component {...props} /> : <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
  )} />
);


export { UserProtectedRoute, AdminProtectedRoute };