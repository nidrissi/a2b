import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Entry from './Entry';

export default function DIY() {
  const [authors, setAuthors] = useState([]);
  const [type, setType] = useState('Article');
  
  const entry = {
    type,
    authors: authors.map(s => s.trim()),
    year: 0
  };
  return (
    <>
      <h1>Do It Yourself</h1>
      <Form>
        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='type'
          >
            Type
          </Form.Label>
          <Col>
            <Form.Control
              id='type'
              as='select'
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value='Article'>Journal article</option>
              <option value='Book'>Book</option>
              <option value='InProceedings'>Conference/Talk proceedings</option>
              <option value='Misc'>Other</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label
            column sm={2}
            htmlFor='authors'
          >
            Authors
          </Form.Label>
          <Col>
            <Form.Control
              id='authors'
              value={authors.join('&')}
              onChange={e => setAuthors(e.target.value.split(/&/))}
            />
          </Col>
        </Form.Group>
      </Form>
      <Entry entry={entry} />
    </>
  );
}
