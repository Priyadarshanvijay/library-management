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
import Books from './books';
import ViewRequests from './admin_pages/viewRequest';
import {UserProtectedRoute, AdminProtectedRoute} from './components/auth_components/protectedRoutes';

function App() {
  return (
    <Router forceRefresh={true}>
      <Switch>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/books">
          <Books />
        </Route>
        <Route exact path="/books/add">
          <AddBook />
        </Route>
        <Route exact path="/requests">
          <ViewRequests />
        </Route>
        <Route exact path="/admin/login" >
          <AdminLoginForm />
        </Route>
        <UserProtectedRoute component={Home} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
