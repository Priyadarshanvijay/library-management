import React, { useState, useEffect } from 'react';
import { Button, Grid, Modal, Form, Message, Dropdown } from 'semantic-ui-react';
const axios = require('axios').default;

const DeleteBookButton = ({ book_name, book_id, setBooks, index }) => {
  const [postingData, setPostingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const show = (dimmer) => {
    setDimmer(dimmer);
    setOpen(true);
  }
  const close = () => setOpen(false);

  const submitUpdate = async () => {
    setErrorMessage('');
    setPostingData(true);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      await axios.delete(`${process.env.REACT_APP_BASE_URI}/book/${book_id}`, { headers });
      setBooks(prev => {
        return [...prev.slice(undefined, index), ...prev.slice(index+1)];
      })
      setPostingData(false);
      close();
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error && e.response.data.error.length > 8) {
        if (e.response.data.error.slice(0, 7) === "Custom:") {
          setErrorMessage(e.response.data.error.slice(8));
        }
      }
      setPostingData(false);
      setPostingData(false);
    }
  }
  return (
    <>
      <Button
        negative
        content="Delete"
        onClick={() => show('blurring')}
      />

      <Modal dimmer={dimmer} open={open} onClose={close}>
        <Modal.Header>Delete Book {book_name}</Modal.Header>
        <Modal.Content>
          <Form warning={errorMessage !== ''}>
            <Grid stackable>
              <Grid.Row columns={1}>
                <Grid.Column width='sixteen'>
                  <Message><strong>Are You Sure You Want to delete {book_name} from Library?</strong></Message>
                  <Message warning>{errorMessage}</Message>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={postingData} color='black' onClick={close}>Cancel</Button>
          <Button negative content="Yes" disabled={postingData} loading={postingData} onClick={submitUpdate} />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default DeleteBookButton;