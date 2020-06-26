import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import {
  selectError,
  selectEntries,
} from './resultsSlice';

import EntryList from './EntryList';

function ErrorAlert({ error }) {
  if (error !== null) {
    return (
      <Alert variant="danger">
        {error.toString()}
      </Alert>
    )
  } else {
    return null
  }
}

export default function Results() {
  const error = useSelector(selectError);
  const entries = useSelector(selectEntries);

  return (
    <div>
      <ErrorAlert error={error} />
      <EntryList entries={entries} />
    </div>
  )
}
