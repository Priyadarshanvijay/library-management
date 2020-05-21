import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {withAdminAuthSubComponent} from '../auth_components/withAdminAuth-SubComponent';

const AddBookButton = () => {
  const history = useHistory();
  return (
    <Menu.Item as='a' onClick={() => { history.push('/books/add') }}>
      <Icon name='book' />Add Books
    </Menu.Item>
  )
};

export default withAdminAuthSubComponent(AddBookButton);