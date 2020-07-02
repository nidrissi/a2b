import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import { selectError } from './resultsSlice';

import EntryList from './EntryList';

function ErrorAlert() {
  const error = useSelector(selectError);

  return (
    <Alert
      variant="danger"
      show={error !== null}
    >
      {error !== null ? error.toString() : null}
    </Alert>
  );
}

export default function Results() {
  return (
    <div>
      <ErrorAlert />
      <EntryList />
    </div>
  )
}
