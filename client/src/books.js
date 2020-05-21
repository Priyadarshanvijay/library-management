import React, { useEffect, useState } from 'react';
import { withSidebar } from './components/withSidebar';
import { Segment, Grid, Card, Icon, Button, Message } from 'semantic-ui-react';
import AddBookButton from './components/sub-componenets/addBookButton'
const axios = require('axios').default;

const BookCard = ({ name, author, copies, issued }) => (
  <Grid.Column>
    <Segment textAlign='center' raised >
      <Card>
        <Card.Content><h4>Name: {name}</h4></Card.Content>
        <Card.Content><Icon name='user' />Author: {author ? author.name : null}</Card.Content>
        <Card.Content extra>
          Total: {copies} / Issued: {issued}
        </Card.Content>
      </Card>
      <Button content='Edit' primary />
      <Button content='Delete' negative />
    </Segment>
  </Grid.Column>
)

const Books = () => {
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function getBooks() {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/book`, {
          headers
        });
        setBooks(response.data);
      } catch (e) {
        console.log(e);
      }
      setFetching(false);
    }
    getBooks();
  }, []);

  if (fetching) {
    return (
      <>
        <h1>All the books</h1>
        <Segment content={<Message>loading</Message>} loading />
      </>
    )
  } else if (books.length === 0) {
    return (
      <>
        <h1>All the books</h1>
        <Segment><Message error>No Books To Load</Message></Segment>
      </>
    )
  } else
    return (
      <>
        <Grid stackable columns='two'>
          <Grid.Column width='twelve'>
            <h1>All the books</h1>
          </Grid.Column>
          <Grid.Column width='four' textAlign='right'>
            <AddBookButton />
          </Grid.Column>
        </Grid>
        <Grid stackable columns='four'>
          {
            books.map((book) => {
              return <BookCard key={book._id} {...book} />
            })
          }
        </Grid>
      </>
    )
}

export default withSidebar(Books);