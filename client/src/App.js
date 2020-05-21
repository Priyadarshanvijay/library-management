import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginForm from './user_pages/LoginForm';
import AdminLoginForm from './admin_pages/AdminLoginForm';
import Home from './home';
import AddBook from './admin_pages/addBook';
import ViewRequests from './admin_pages/viewRequest';
import {UserProtectedRoute, AdminProtectedRoute} from './components/auth_components/protectedRoutes';

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/books/add">
          <AddBook />
        </Route>
        <Route exact path="/requests">
          <ViewRequests />
        </Route>
        <Route  path="/admin/login" >
          <AdminLoginForm />
        </Route>
        <UserProtectedRoute component={Home} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
