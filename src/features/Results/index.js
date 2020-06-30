import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import {
  closeError,
  selectError,
  selectErrorShown,
} from './resultsSlice';

import EntryList from './EntryList';

function ErrorAlert() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const errorShown = useSelector(selectErrorShown);

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
  return (
    <div>
      <ErrorAlert />
      <EntryList />
    </div>
  )
}
