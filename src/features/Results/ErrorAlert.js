import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import { selectError, closeError } from './resultsSlice';

export default function ErrorAlert() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  return (
    <Alert
      variant="danger"
      show={error !== null}
      dismissible
      onClose={() => dispatch(closeError())}
    >
      {error !== null ? error.toString() : null}
    </Alert>
  );
}

