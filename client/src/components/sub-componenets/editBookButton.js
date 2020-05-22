import React, { useState, useEffect } from 'react';
import { Button, Grid, Modal, Form, Message, Dropdown } from 'semantic-ui-react';
const axios = require('axios').default;

const EditBookButton = ({ book_name, book_id, setBooks, index }) => {
  const [postingData, setPostingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [dimmer, setDimmer] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [ISBN, setISBN] = useState('');
  const [author, setAuthor] = useState('');
  const [copies, setCopies] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchAuthors() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/author`, {
        headers
      });
      const receivedArr = response.data.map((author) => {
        return {
          text: author["name"],
          key: author["_id"],
          value: author["_id"]
        }
      });
      setAuthors(receivedArr);
    }
    fetchAuthors();
  }, [])

  const handleChange = (event, { name, value }) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'ISBN') {
      setISBN(value);
    } else if (name === 'copies') {
      setCopies(value);
    } else if (name === 'author') {
      setAuthor(value)
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
      if ((name === '') && (ISBN === '') && (author === '') && (copies === '')) {
        throw new Error('Custom: Please Update At Least One Thing!');
      }
      if (name !== '') formData.name = name;
      if (ISBN !== '') formData.ISBN = ISBN;
      if (author !== '') formData.author = author;
      if (copies !== '') formData.copies = copies;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URI}/book/${book_id}`, formData, {
        headers
      });
      const book = response.data;
      setBooks(prev => {
        return [...prev.slice(undefined, index), book, ...prev.slice(index+1)];
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
        primary
        content="Edit"
        onClick={() => show('blurring')}
      />

      <Modal dimmer={dimmer} open={open} onClose={close}>
        <Modal.Header>Update Book {book_name}</Modal.Header>
        <Modal.Content>
          <Form warning={errorMessage !== ''}>
            <Grid stackable>
              <Grid.Row columns={1}>
                <Grid.Column width='sixteen'>
                  <Message><strong>ONLY ENTER THOSE FIELDS WHICH YOU WANT TO UPDATE</strong></Message>
                  <Message warning>{errorMessage}</Message>
                  <Form.Input onChange={handleChange} value={name} name='name' placeholder='Enter Updated Name' label='Book Name'></Form.Input>
                  <Form.Input onChange={handleChange} value={ISBN} name='ISBN' placeholder='Enter Updated ISBN' label='ISBN'></Form.Input>
                  <Form.Field>
                    <label>Author</label>
                    <Dropdown placeholder='Enter Updated Author' fluid search selection name="author" value={author} onChange={handleChange} options={authors}/>
                  </Form.Field>
                  <Form.Input onChange={handleChange} value={copies} name='copies' placeholder='Enter Updated Copies' label='Copies' type='number'></Form.Input>
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
    </>
  )
}

export default EditBookButton;