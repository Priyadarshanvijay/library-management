import React, { useState, useEffect } from 'react';
import { isUserLoggedIn, isAdminLoggedIn } from './isLoggedIn';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

export const withAuthSubComponent = (Component) => {
  return function (props) {
    const [isLoggedIn, setLoggedIn] = useState();
    useEffect(() => {
      async function checkLogin() {
        const userLogin = await isUserLoggedIn();
        const adminLogin = await isAdminLoggedIn();
        if (userLogin || adminLogin) {
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
      return <></>
    }
  }
};