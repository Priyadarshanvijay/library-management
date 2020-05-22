import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { withoutAuth } from '../components/auth_components/withoutAuth';
const axios = require('axios').default;

const LoginForm = () => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setLoggingIn] = useState(false);
  const handleInput = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }
  const login = async () => {
    setLoggingIn(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/admin/login`, {
        email,
        password
      });
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
      const { from } = location.state || { from: { pathname: "/" } };
      setLoggingIn(false);
      history.replace(from);
    } catch (e) {
      console.log('error', e)
      setLoggingIn(false);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='https://cdn.dribbble.com/users/1303634/screenshots/4736402/icon-3.jpg' /> Log-in to your admin account
      </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={email}
              name='email'
              onChange={handleInput}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={handleInput}
            />

            <Button onClick={login} loading={isLoggingIn} primary fluid size='large'>
              Login
          </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default withoutAuth(LoginForm);