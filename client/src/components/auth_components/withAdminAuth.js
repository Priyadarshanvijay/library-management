import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAdminLoggedIn } from './isLoggedIn';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

export const withAdminAuth = (Component) => {
  return function (props) {
    const [isLoggedIn, setLoggedIn] = useState();
    useEffect(() => {
      async function checkLogin() {
        const adminLogin = await isAdminLoggedIn();
        if (adminLogin) {
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
        <Segment>
          <Dimmer active>
            <Loader content='Loading' />
          </Dimmer>
        </Segment>
      )
    }
    else if (isLoggedIn === true) {
      return (
        <Component {...props} />
      )
    } else {
      return (
        <Redirect to={{ pathname: '/' }} />)
    }
  }
};