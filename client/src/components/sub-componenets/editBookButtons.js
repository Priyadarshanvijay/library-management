import React from 'react';
import { Button } from 'semantic-ui-react';
import { withAdminAuthSubComponent } from '../auth_components/withAdminAuth-SubComponent';

const EditBookButtons = () => {
  return (
    <>
      <Button content='Edit' primary />
      <Button content='Delete' negative />
    </>
  )
};

export default withAdminAuthSubComponent(EditBookButtons);