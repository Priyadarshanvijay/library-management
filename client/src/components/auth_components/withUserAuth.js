import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isUserLoggedIn } from './isLoggedIn';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

export const withUserAuth = (Component) => {
  return function (props) {
    const [isLoggedIn, setLoggedIn] = useState();
    useEffect(() => {
      async function checkLogin() {
        const userLogin = await isUserLoggedIn();
        if (userLogin) {
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