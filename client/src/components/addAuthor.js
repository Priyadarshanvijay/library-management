import React, { useState } from 'react'
import { Button, Grid, Modal, Form } from 'semantic-ui-react';
const axios = require('axios').default;

const AddAuthor = ({ setAuthors }) => {
  const [authorNameError, setAuthorNameError] = useState(false);
  const [postingData, setPostingData] = useState(false);
  const [authorName, changeAuthorName] = useState('');
  const handleChange = (event, { name, value }) => {
    if (name === 'authorName') {
      changeAuthorName(value);
      setAuthorNameError(false);
    }
  }
  const [open, setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(true);
  const show = (dimmer) => {
    setDimmer(dimmer);
    setOpen(true);
  }
  const close = () => setOpen(false);
  const submitAuthor = async () => {
    setPostingData(true);
    if (authorName === '') {
      setAuthorNameError(true);
      return;
    }
    const formData = {
      name: authorName
    };
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/author`, formData, {
        headers
      });
      setAuthors(prev => {
        return [...prev, {
          text: response.data.name,
          key: response.data._id,
          value: response.data._id
        }]
      })
      setPostingData(false);
      clearForm();
      close();
    } catch (e) {
      setPostingData(false);
    }
  }
  const clearForm = () => {
    changeAuthorName('');
  }
  return (
    <div>
      <Button
        type="button"
        positive
        icon='plus'
        labelPosition='left'
        content="Add Author"
        onClick={() => show('blurring')}
      />

      <Modal dimmer={dimmer} open={open} onClose={close}>
        <Modal.Header>Add a new Author</Modal.Header>
        <Modal.Content>
          <Form>
            <Grid stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Input error={authorNameError} fluid label="Author Name" name="authorName" value={authorName} onChange={handleChange} placeholder="Author Name" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button disabled={postingData} color='black' onClick={close}>Cancel</Button>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content="Save new Author"
            disabled={postingData}
            loading={postingData}
            onClick={submitAuthor}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default AddAuthor;