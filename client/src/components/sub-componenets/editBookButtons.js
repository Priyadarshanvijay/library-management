import React from 'react';
import { Button } from 'semantic-ui-react';
import { withAdminAuthSubComponent } from '../auth_components/withAdminAuth-SubComponent';
import EditBookButton from './editBookButton';
import DeleteBookButton from './deleteBookButton';

const EditBookButtons = ({ book, setBooks, index }) => {
  return (
    <>
      <EditBookButton book_name={book.name} book_id={book._id} setBooks={setBooks} index={index}/>
      <DeleteBookButton book_name={book.name} book_id={book._id} setBooks={setBooks} index={index}/>
    </>
  )
};

export default withAdminAuthSubComponent(EditBookButtons);