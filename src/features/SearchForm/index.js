import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { setQuery } from './searchFormSlice';
import { selectIsLoading } from '../Results/resultsSlice';

function splitter(current) {
  const rx = /\s*&\s*/;
  return current.split(rx).filter(s => s !== '');
}

export default function SearchForm() {
  const dispatch = useDispatch();
  const [currentIds, setCurrentIds] = useState('');
  const [currentAuthors, setCurrentAuthors] = useState('');

  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const query = {
      ids: splitter(currentIds),
      authors: splitter(currentAuthors),
    };
    dispatch(setQuery(query));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="idList">
        <Form.Label column sm="2">ID List</Form.Label>
        <Col sm={10}>
          <Form.Control
            value={currentIds}
            onChange={e => setCurrentIds(e.target.value)}
            placeholder="ID1 & ID2 & ..."
            title="List of IDs, separated by '&'."
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="author">
        <Form.Label column sm="2">Author(s)</Form.Label>
        <Col sm={10}>
          <Form.Control
            value={currentAuthors}
            onChange={e => setCurrentAuthors(e.target.value)}
            placeholder="Carl Gauß & David Hilbert & ..."
            title="Author(s) separated by '&'."
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button
            disabled={isLoading}
            type="submit"
          >
            Search
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
