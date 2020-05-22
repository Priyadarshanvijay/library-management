import React, { useState, useEffect } from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import { Menu, Container, Dropdown, Image, Segment } from 'semantic-ui-react';
import withSidebar from './components/withSidebar';
import withAuth from './components/auth_components/withAuth';

const Home = (props) => {
  const history = useHistory();

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')).name);
  }, []);
  
  return (
    <Segment>
      <h1>Hello {user}, Welcome To EXAMPLE Library, please Choose One of the Options From The Left</h1>
      <Segment>
        Todays Date is {new Date().toLocaleDateString()}
      </Segment>
    </Segment>
  )
}

export default withRouter(withAuth(withSidebar(Home)));