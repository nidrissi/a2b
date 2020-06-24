import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

import {
  selectId,
  setId,
} from './searchFormSlice';

export default function SearchForm() {
  const dispatch = useDispatch();
  const id = useSelector(selectId);

  return (
    <Form>
      <Form.Group controlId="id">
        <Form.Label>ID</Form.Label>
        <Form.Control
          value={id}
          onChange={e => dispatch(setId(e.target.value))}
        />
      </Form.Group>
    </Form>
  );
}
