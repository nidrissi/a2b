import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

import {
  selectAuthor,
  setAuthor,
} from './searchFormSlice';

export default function SearchForm() {
  const dispatch = useDispatch();
  const author = useSelector(selectAuthor);

  return (
    <Form>
      <Form.Group controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          value={author}
          onChange={e => dispatch(setAuthor(e.target.value))}
        />
      </Form.Group>
    </Form>
  );
}
