import React, { useState } from 'react';
import { Segment, Form, Grid, Button } from 'semantic-ui-react';
import { withSidebar } from './components/withSidebar';
const axios = require('axios').default;

const AddBook = (props) => {
  return (
    <Segment padded='very' basic >
      <h1>AddBook</h1>
      <Form>
        <Grid stackable>
          <Grid.Column width={6}>
            <Form.Input label='First name' placeholder='First Name' fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input label='Middle Name' placeholder='Middle Name' fluid />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input label='Last Name' placeholder='Last Name' fluid />
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={6}>
            <Form.Input label='First name' placeholder='First Name' fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input label='Middle Name' placeholder='Middle Name' fluid />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input label='Last Name' placeholder='Last Name' fluid />
          </Grid.Column>
        </Grid>
        <br />
        <Button primary>Add Book</Button>
        <Button negative>Cancel</Button>
      </Form>
    </Segment>
  )
}

export default withSidebar(AddBook)