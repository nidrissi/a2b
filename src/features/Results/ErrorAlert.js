import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import { selectError, clearError } from './resultsSlice';

export default function ErrorAlert() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  return (error === null) ? null : (
    <Alert
      variant="danger"
      dismissible
      onClose={() => dispatch(clearError())}
    >
      {error.toString()}
    </Alert>
  );
}

