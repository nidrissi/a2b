import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import {
  closeError,
  selectError,
  selectErrorShown,
  selectEntries,
} from './resultsSlice';

import EntryList from './EntryList';

function ErrorAlert({ error, errorShown }) {
  const dispatch = useDispatch();

  if (error !== null && !errorShown) {
    return (
      <Alert
        variant="danger"
        dismissible
        onClose={() => dispatch(closeError())}
      >
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
  const errorShown = useSelector(selectErrorShown);

  return (
    <div>
      <ErrorAlert error={error} errorShown={errorShown} />
      <EntryList entries={entries} />
    </div>
  )
}
