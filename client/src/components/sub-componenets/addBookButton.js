import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { withAdminAuthSubComponent } from '../auth_components/withAdminAuth-SubComponent';

const AddBookButton = () => {
  const history = useHistory();
  return (
    <Button fluid onClick={() => { history.push('/books/add') }}>
      <Icon name='plus circle' />Add Book
    </Button>
  )
};

export default withAdminAuthSubComponent(AddBookButton);