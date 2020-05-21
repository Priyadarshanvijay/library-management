import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Sidebar, Menu, Segment, Icon, Container } from 'semantic-ui-react';
import IssueReturnRequestButton from './sub-componenets/issueReturnRequestButton';

export const withSidebar = (Component) => {
  return function (props) {
    const history = useHistory();
    const [user, changeUser] = useState(JSON.parse(localStorage.getItem('user')));
    const logout = () => {
      localStorage.clear();
      history.push("/");
    }
    return (
      <Sidebar.Pushable as={Segment} style={{ height: '100vh' }}>
        <Sidebar
          as={Menu}
          icon='labeled'
          inverted
          vertical
          visible={true}
          width='thin'
          style={{
            width: '8%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu.Item as='a' onClick={() => { history.push('/') }}>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='user' />
            Hi {user.name}
          </Menu.Item>
          <Menu.Item as='a' onClick={() => { history.push('/books') }}>
            <Icon name='book' />Books
          </Menu.Item>
          <IssueReturnRequestButton />
          <Menu.Item onClick={logout} as='a'>
            <Icon name='sign-out' />
            Logout
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher style={{ height: '100vh', overflowY: 'scroll' }}>
          <Container fluid style={{ marginTop: '2%', paddingRight: '15%' }} >
            <Component {...props} />
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable >
    )
  }
};