import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAdminLoggedIn, isUserLoggedIn } from './isLoggedIn';

export const withoutAuth = (Component) => {
  return function (props) {
    const [isLoggedIn, setLoggedIn] = useState();
    useEffect(() => {
      async function checkLogin() {
        const userLogin = await isUserLoggedIn();
        const adminLogin = await isAdminLoggedIn();
        if (adminLogin || userLogin) {
          setLoggedIn(true);
        }
        else {
          setLoggedIn(false);
        }
      }
      checkLogin();
    }, []);
    if (typeof isLoggedIn === 'undefined') {
      return (
        <h1>LOl</h1>
      )
    }
    else if (isLoggedIn === false) {
      console.log(isLoggedIn)
      return (
        <Component {...props} />
      )
    } else {
      return (
        <Redirect to={{ pathname: '/' }} />)
    }
  }
};