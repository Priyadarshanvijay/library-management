import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdminLoggedIn, isUserLoggedIn } from './isLoggedIn';

class UserProtectedRoute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    };
    isUserLoggedIn()
    .then((response) => {
      if(response){
        this.setState(() => ({ isLoading: false, isLoggedIn: true }));
      } else {
        this.setState(() => ({ isLoading: false, isLoggedIn: false }));
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }

  render() {
    return this.state.isLoading ? null :
      this.state.isLoggedIn ?
        <Route path={this.props.path} component={this.props.component} exact={this.props.exact} /> :
        <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
  }
}

class AdminProtectedRoute extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      isLoggedIn: false
    };
    isAdminLoggedIn()
    .then((response) => {
      if(response){
        this.setState(() => ({ isLoading: false, isLoggedIn: true }));
      } else {
        this.setState(() => ({ isLoading: false, isLoggedIn: false }));
      }
    })
  }

  render() {
    return this.state.isLoading ? null :
      this.state.isLoggedIn ?
        <Route path={this.props.path} component={this.props.component} exact={this.props.exact} /> :
        <Redirect to={{ pathname: '/admin/login', state: { from: this.props.location } }} />
  }
}

export { UserProtectedRoute, AdminProtectedRoute };