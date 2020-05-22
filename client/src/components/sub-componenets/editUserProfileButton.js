import React, { useState } from 'react';
import { Button, Grid, Modal, Form, Message } from 'semantic-ui-react';
import { withUserAuthSubComponent } from '../auth_components/withUserAuth-SubComponent';
const axios = require('axios').default;

const EditUserProfileButton = ({ setUser }) => {
  const [postingData, setPostingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event, { name, value }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const show = (dimmer) => {
    setDimmer(dimmer);
    setOpen(true);
  }
  const close = () => setOpen(false);

  const submitUpdate = async () => {
    setErrorMessage('');
    setPostingData(true);
    try {
      const formData = {};
      if ((name === '') && (email === '') && (password === '')) {
        throw new Error('Please Update At Least One Thing!');
      }
      if (name !== '') formData.name = name;
      if (email !== '') formData.email = email;
      if (password !== '') formData.password = password;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URI}/user`, formData, {
        headers
      });
      const user = response.data;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      setPostingData(false);
      close();
    } catch (e) {
      setErrorMessage(e.message);
      setPostingData(false);
    }
  }
  return (
    <div>
      <Button
        type="button"
        color='black'
        content="Update Profile"
        onClick={() => show('blurring')}
      />

      <Modal dimmer={dimmer} open={open} onClose={close}>
        <Modal.Header>Update Profile</Modal.Header>
        <Modal.Content>
          <Form warning={errorMessage !== ''}>
            <Grid stackable>
              <Grid.Row columns={1}>
                <Grid.Column width='sixteen'>
                  <Message><strong>ONLY ENTER THOSE FIELDS WHICH YOU WANT TO UPDATE</strong></Message>
                  <Message warning>{errorMessage}</Message>
                  <Form.Input onChange={handleChange} value={name} name='name' placeholder='Enter Updated Name' label='Name'></Form.Input>
                  <Form.Input onChange={handleChange} value={email} name='email' placeholder='Enter Updated Email' label='Email' type='email'></Form.Input>
                  <Form.Input onChange={handleChange} value={password} name='password' placeholder='Enter Updated Password' label='Password' type='password'></Form.Input>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={postingData} color='black' onClick={close}>Cancel</Button>
          <Button
            positive
            icon='book'
            labelPosition='right'
            content="Update"
            disabled={postingData}
            loading={postingData}
            onClick={submitUpdate}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default withUserAuthSubComponent(EditUserProfileButton);