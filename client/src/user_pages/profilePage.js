import React, { useState, useEffect } from 'react';
import { Segment, Message, Container, Grid, Button } from 'semantic-ui-react';
import { withUserAuth } from '../components/auth_components/withUserAuth';
import withSidebar from '../components/withSidebar';
import EditUserProfileButton from '../components/sub-componenets/editUserProfileButton';
const axios = require('axios').default;

const ProfilePage = () => {
  const [user, setUser] = useState(undefined);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/user/me`, {
          headers
        });
        setUser(response.data);
        setFailed(false);
      } catch (e) {
        setFailed(true);;
      }
    }
    fetchUser();
  }, []);

  if (failed) {
    return (
      <Segment><Message error>Unable To Fetch User</Message></Segment>
    )
  } else if (typeof user === 'undefined') {
    return (
      <Segment basic style={{ height: '100vh' }} loading></Segment>
    )
  }

  return (
    <>
      <Segment color='orange' inverted>
        <Grid columns='two'>
          <Grid.Column>
            <h1>Profile Page</h1>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <EditUserProfileButton setUser={setUser} />
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment tertiary>
        <Grid columns='two'>
          <Grid.Column width={5}>
            <Segment basic><strong>Name : </strong></Segment>
            <Segment basic><strong>Email Address : </strong></Segment>
            <Segment basic><strong>Member Since : </strong></Segment>
            <Segment basic><strong>Membership Validity Till : </strong></Segment>
            <Segment basic><strong>In-house (Library) Reading Time Remaining :</strong></Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <Segment>{user.name}</Segment>
            <Segment>{user.email}</Segment>
            <Segment>{new Date(user.validFrom).toLocaleString()}</Segment>
            <Segment>{new Date(user.validTill).toLocaleString()}</Segment>
            <Segment>{user.readingHoursRemaining} hours</Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

export default withUserAuth(withSidebar(ProfilePage));