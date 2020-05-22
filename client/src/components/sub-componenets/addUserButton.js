import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { withAdminAuthSubComponent } from '../auth_components/withAdminAuth-SubComponent';

const AddUserButton = () => {
  const history = useHistory();
  return (
    <Menu.Item as='a' onClick={() => { history.push('/user/add') }}>
      <Icon name='plus' />Add A New User
    </Menu.Item>
  )
};

export default withAdminAuthSubComponent(AddUserButton);