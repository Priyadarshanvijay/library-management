import React, { useState } from 'react';
import { Button, Grid, Modal, Form, Message } from 'semantic-ui-react';
import { withUserAuthSubComponent } from '../auth_components/withUserAuth-SubComponent';
const axios = require('axios').default;

const IssueRequestButton = ({ book }) => {
  const [postingData, setPostingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const show = (dimmer) => {
    setDimmer(dimmer);
    setOpen(true);
  }
  const close = () => setOpen(false);
  const submitIssueRequest = async (forHome) => {
    setErrorMessage('');
    setPostingData(true);
    const formData = {
      home: forHome
    };
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/book/${book._id}/issuereq`, formData, {
        headers
      });
      setPostingData(false);
      close();
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error && e.response.data.error.length > 8) {
        if (e.response.data.error.slice(0, 7) === "Custom:") {
          setErrorMessage(e.response.data.error.slice(8));
        }
      }
      setPostingData(false);
    }
  }
  return (
    <div>
      <Button
        type="button"
        positive
        content="Create Issue Request"
        onClick={() => show('blurring')}
      />

      <Modal dimmer={dimmer} open={open} onClose={close}>
        <Modal.Header>Issue {book.name} : {book.author.name}</Modal.Header>
        <Modal.Content>
          <Form error={errorMessage !== ''}>
            <Grid stackable>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Message error>{errorMessage}</Message>
                  {
                    (book.forHome && book.forLibrary) ? <Message>Do you want to issue the book for reading here or taking it home?</Message> :
                      (book.forHome) ? <Message>Do you want to issue the book for taking it home?</Message> :
                        (book.forLibrary) ? <Message>Do you want to issue the book for Readiing here?</Message> :
                          <Message warning>This Book is Not Available for Issuing</Message>
                  }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={postingData} color='black' onClick={close}>Cancel</Button>
          {
            (book.forHome) ? <Button
              positive
              icon='home'
              labelPosition='right'
              content="Taking Home"
              disabled={postingData}
              loading={postingData}
              onClick={() => submitIssueRequest(true)}
            /> : null
          }
          {
            (book.forLibrary) ? <Button
              positive
              icon='book'
              labelPosition='right'
              content="Reading Here"
              disabled={postingData}
              loading={postingData}
              onClick={() => submitIssueRequest(false)}
            /> : null
          }
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default withUserAuthSubComponent(IssueRequestButton);