import React, { useState } from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import { Menu, Container, Dropdown, Image } from 'semantic-ui-react';
import {withSidebar} from './components/withSidebar';

const Home = (props) => {
  const history = useHistory();
  
  return (
    <h1>LOl</h1>
  )
}

export default withRouter(withSidebar(Home));