import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import {
  selectError,
  selectIsLoading,
  selectResults,
} from './resultsSlice';

export default function Results() {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const results = useSelector(selectResults);

  if (error !== null) {
    return (
      <Alert variant="danger">
        <strong>Error: </strong>
        {error}
      </Alert>
    )
  } else if (isLoading) {
    return (
      <Alert variant="info">
        <Spinner animation="border" size="sm" />
        {' '}
        Loading...
      </Alert>
    )
  } else {
    return (
      <div>
        {
          results.map(s =>
            <Alert variant="dark" key={s}>
              <pre className="m-0">
                <code>
                  {s}
                </code>
              </pre>
            </Alert>
          )
        }
      </div>
    )
  }
}
