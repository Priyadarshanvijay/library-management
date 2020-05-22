import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAdminLoggedIn, isUserLoggedIn } from './isLoggedIn';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const withAuth = (Component) => {
  return function (props) {
    const [isLoggedIn, setLoggedIn] = useState();
    useEffect(() => {
      async function checkLogin() {
        const adminLogin = await isAdminLoggedIn();
        const userLogin = await isUserLoggedIn();
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
        <Redirect to={{ pathname: '/login' }} />)
    }
  }
};

export default withAuth;