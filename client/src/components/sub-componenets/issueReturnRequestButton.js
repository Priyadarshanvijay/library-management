import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {withAdminAuthSubComponent} from '../auth_components/withAdminAuth-SubComponent';

const IssueReturnRequestButton = () => {
  const history = useHistory();
  return (
    <Menu.Item as='a' onClick={() => { history.push('/requests') }}>
      <Icon name='envelope' />View Issue/Return Request
    </Menu.Item>
  )
};

export default withAdminAuthSubComponent(IssueReturnRequestButton);