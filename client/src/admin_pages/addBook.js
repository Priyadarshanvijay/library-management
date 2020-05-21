import React, { useState, useEffect } from 'react';
import { Segment, Form, Grid, Button, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { withSidebar } from '../components/withSidebar';
import { withAdminAuth } from '../components/auth_components/withAdminAuth';
import AddAuthor from '../components/addAuthor';
const axios = require('axios').default;

const AddBook = (props) => {
  const history = useHistory();
  const [authors, setAuthors] = useState([]);
  const [bookName, setBookName] = useState('');
  const [ISBN, setISBN] = useState('');
  const [author, setAuthor] = useState('');
  const [copies, setCopies] = useState('');
  const [forHome, setForHome] = useState(false);
  const [forLibrary, setForLibrary] = useState(false);
  const [sendingData, setSendingData] = useState(false);

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
    if (name === 'forLibrary') {
      const curSetting = forLibrary;
      setForLibrary(!curSetting);
    } else if (name === 'forHome') {
      const curSetting = forHome;
      setForHome(!curSetting);
    } else if (name === 'bookName') {
      setBookName(value);
    } else if (name === 'ISBN') {
      setISBN(value);
    } else if (name === 'author') {
      setAuthor(value);
    } else if (name === 'copies') {
      setCopies(value);
    }
  }
  const postData = async () => {
    setSendingData(true);
    const formData = {
      name: bookName,
      ISBN,
      author,
      forHome,
      forLibrary,
      copies
    };
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        "Content-Type": "application/json"
      }
      const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/book`, formData, {
        headers
      });
    } catch (e) {
      console.log(e);
    }
    setSendingData(false);
  }
  return (
    <Segment padded='very' basic >
      <h1>AddBook</h1>
      <Form loading={sendingData}>
        <Grid stackable>
          <Grid.Column width={6}>
            <Form.Input label='Book Name' name='bookName' onChange={handleChange} value={bookName} placeholder='Book Name' fluid />
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Input label='ISBN' name='ISBN' onChange={handleChange} value={ISBN} placeholder='ISBN' fluid />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form.Field
              error={false}
            >
              <label>Author</label>
              <Dropdown
                placeholder='Author'
                fluid
                search
                selection
                name="author"
                value={author}
                onChange={handleChange}
                options={authors}
              />
            </Form.Field>
          </Grid.Column>
        </Grid>
        <Grid stackable>
          <Grid.Column width={6}>
            <Form.Input value={copies} name='copies' onChange={handleChange} type='number' min='0' label='Number Of Copies' placeholder='Copies' fluid />
          </Grid.Column>
          <Grid.Column width={3}>
            <Form.Checkbox checked={forHome} name='forHome' onChange={handleChange} toggle label='For Home' />
          </Grid.Column>
          <Grid.Column width={3}>
            <Form.Checkbox checked={forLibrary} name='forLibrary' onChange={handleChange} toggle label='For Library' />
          </Grid.Column>
          <Grid.Column width={4}>
            <AddAuthor setAuthors={setAuthors} />
          </Grid.Column>
        </Grid>
        <br />
        <Button loading={sendingData} onClick={postData} disabled={sendingData} primary>Add Book</Button>
        <Button disabled={sendingData} onClick={() => { history.push('/') }} negative>Cancel</Button>
      </Form>
    </Segment>
  )
}

export default withAdminAuth(withSidebar(AddBook));