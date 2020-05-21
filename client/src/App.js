import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginForm from './LoginForm';
import AdminLoginForm from './AdminLoginForm';
import Home from './home';
import AddBook from './addBook';
import {UserProtectedRoute, AdminProtectedRoute} from './components/protectedRoutes';

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
        <Route  path="/admin/login" >
          <AdminLoginForm />
        </Route>
        <UserProtectedRoute component={Home} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
