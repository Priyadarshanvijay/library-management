import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginForm from './LoginForm';
import AdminLoginForm from './AdminLoginForm';
import {UserProtectedRoute, AdminProtectedRoute} from './components/protectedRoutes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route  path="/admin/login" >
          <AdminLoginForm />
        </Route>
        <Route exact path="/">
          <div>Page Does'nt Exists Right now</div>
        </Route>
        <Route path="/">
          <div>Page Does'nt Exists Right now</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
