import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { setQuery } from './searchFormSlice';

export default function SearchForm() {
  const dispatch = useDispatch();
  const [currIdList, setCurrIdList] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const query = {
      idList: currIdList.split(',').map(s => s.trim()).join(','),
    };
    dispatch(setQuery(query));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="id">
        <Form.Label column sm="2">ID List</Form.Label>
        <Col sm={10}>
          <Form.Control
            value={currIdList}
            onChange={e => setCurrIdList(e.target.value)}
            placeholder="ID1,ID2,..."
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button
            type="submit"
            disabled={!currIdList}
          >
            Search
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
