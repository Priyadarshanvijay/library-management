import React, { useState } from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import { Menu, Container, Dropdown, Image } from 'semantic-ui-react';
import withSidebar from './components/withSidebar';
import withAuth from './components/auth_components/withAuth';

const Home = (props) => {
  const history = useHistory();
  
  return (
    <h1>LOl</h1>
  )
}

export default withRouter(withAuth(withSidebar(Home)));