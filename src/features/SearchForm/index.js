import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setQuery } from './searchFormSlice';
import { selectIsLoading } from '../Results/resultsSlice';

function splitter(current) {
  const rx = /\s*&\s*/;
  return current.split(rx).filter(s => s !== '');
}

function InputField({ value, setValue, label, placeholder, title }) {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  return (
    <Form.Group as={Row}>
      <Form.Label
        htmlFor={id}
        column
        sm="2"
      >
        {label}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          id={id}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          title={title}
        />
      </Col>
    </Form.Group>
  );
}

function SubmitClearButtons({ isLoading }) {
  return (
    <Form.Group as={Form.Row}>
      <Col sm={10}>
        <Button
          disabled={isLoading}
          type="submit"
          block
        >
          {isLoading ?
            <span><Spinner animation="border" size="sm" /> Loading...</span>
            : <span><FontAwesomeIcon icon="search" /> Search</span>}
        </Button>
      </Col>
      <Col>
        <Button
          type="reset"
          variant="secondary"
          block
        >
          <FontAwesomeIcon icon="trash-alt" /> Clear
        </Button>
      </Col>
    </Form.Group>
  );
}

export default function SearchForm() {
  const dispatch = useDispatch();
  const [currentIds, setCurrentIds] = useState('');
  const [currentAuthors, setCurrentAuthors] = useState('');
  const [currentTitles, setCurrentTitles] = useState('');

  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const query = {
      ids: splitter(currentIds),
      authors: splitter(currentAuthors),
      titles: splitter(currentTitles)
    };
    dispatch(setQuery(query));
  };

  const handleReset = _e => {
    [setCurrentIds, setCurrentTitles, setCurrentAuthors].forEach(set => { set('') })
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <InputField
        value={currentIds}
        setValue={setCurrentIds}
        label="ID list"
        placeholder="ID1 & ID2 & ..."
        title="List of IDs, separated by '&'. Version will be stripped, e.g. 1911.12281v1 ⇒ 1911.12281."
      />
      <InputField
        value={currentAuthors}
        setValue={setCurrentAuthors}
        label="Authors"
        placeholder="Henri Poincaré & David Hilbert & ..."
        title="Author(s) separated by '&'."
      />
      <InputField
        value={currentTitles}
        setValue={setCurrentTitles}
        label="Title"
        placeholder="operad & configuration space & ..."
        title="Words/sentences to search in the title separated by '&'."
      />
      <SubmitClearButtons isLoading={isLoading} />
    </Form>
  );
}
