import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { withUserAuthSubComponent } from '../auth_components/withUserAuth-SubComponent';

const ViewUserHistory = () => {
  const history = useHistory();
  return (
    <Menu.Item as='a' onClick={() => { history.push('/user/requests') }}>
      <Icon name='history' />View Requests
    </Menu.Item>
  )
};

export default withUserAuthSubComponent(ViewUserHistory);