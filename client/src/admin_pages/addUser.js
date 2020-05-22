import React, { useState, useEffect } from 'react';
import { Segment, Form, Grid, Button, Dropdown, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import withSidebar from '../components/withSidebar';
import { withAdminAuth } from '../components/auth_components/withAdminAuth';
const axios = require('axios').default;

const AddUser = (props) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [noOfDays, setNoOfDays] = useState();
  const [readingHours, setReadingHours] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [isSuccess, setSuccess] = useState(0);
  const [sendingData, setSendingData] = useState(false);

  const handleChange = (event, { name, value }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setErrorMessage('');
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      if(value === password){
        setErrorMessage('');
      } else {
        setErrorMessage('Both Passwords Do Not Match')
      }
      setPasswordConfirm(value);
    } else if (name === 'noOfDays') {
      setNoOfDays(value);
    } else if (name === 'readingHours') {
      setReadingHours(value);
    }
  }
  const postData = async () => {
    setSendingData(true);
    setErrorMessage('');
    setWarningMessage('');
    if(password.length < 6){
      setErrorMessage('Minimum Length of Password is 6 digits');
      setSendingData(false);
      return;
    }
    const formData = {
      name,
      email,
      password,
      passwordConfirm,
      noOfDays,
      readingHours
    };
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/user/register`, formData, {
        headers
      });
      setSuccess(1);
    } catch (e) {
      setErrorMessage('There Was Some Error');
      console.log(e);
    }
    setSendingData(false);
  }
  return (
    <Segment padded='very' basic >
      <h1>Add User</h1>
      <Form warning={warningMessage.length !== 0} error={errorMessage.length !== 0} success={isSuccess === 1} loading={sendingData}>
        <Message success><h1>User Added SuccessFully</h1></Message>
        <Message warning><h1>{warningMessage}</h1></Message>
        <Message error><h1>{errorMessage}</h1></Message>
        <Grid stackable>
          <Grid.Column width={6}>
            <Form.Input label='Name' name='name' onChange={handleChange} value={name} placeholder='Name' fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input label='Email' name='email' onChange={handleChange} value={email} placeholder='Email' type='email' fluid />
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={6}>
            <Form.Input value={password} name='password' onChange={handleChange} type='password' label='Password' placeholder='Password' fluid />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Input value={passwordConfirm} name='passwordConfirm' onChange={handleChange} type='password' label='Confirm Password' placeholder='Confirm Password' fluid />
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={3}>
            <Form.Input value={noOfDays} name='noOfDays' onChange={handleChange} type='number' min={1} label='Membership Duration In Days' placeholder='Membership Duration In Days' fluid />
          </Grid.Column>
          <Grid.Column width={3}>
            <Form.Input value={readingHours} name='readingHours' onChange={handleChange} type='number' min={0} label='Reading Hours To Allot' placeholder='Reading Hours To Allot' fluid />
          </Grid.Column>
        </Grid>
        <br />
        <Button loading={sendingData} onClick={postData} disabled={sendingData} primary>Add User</Button>
        <Button disabled={sendingData} onClick={() => { history.push('/') }} negative>Cancel</Button>
      </Form>
    </Segment>
  )
}

export default withAdminAuth(withSidebar(AddUser));