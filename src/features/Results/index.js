import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import {
  selectError,
  selectIsLoading,
  selectEntries,
} from './resultsSlice';

function LoadingAlert({isLoading=false}) {
  if (isLoading) {
    return (
      <Alert variant="info">
        <Spinner animation="border" size="sm" />
        {' '}
        Loading...
      </Alert>
    )
  } else {
    return null
  }
}

function ErrorAlert({error}) {
  if (error !== null) {
    return (
      <Alert variant="danger">
        <strong>Error: </strong>
        {error.toString()}
      </Alert>
    )
  } else {
    return null
  }
}

function EntryList({entries}) {
  console.log(entries);
  const renderedEntries = entries.map(s =>
    <Alert variant="dark" key={s}>
      <pre className="m-0">
        {s}
      </pre>
    </Alert>
  );
  return <div>{renderedEntries}</div>
}

export default function Results() {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const entries = useSelector(selectEntries);

  return (
    <div>
      <LoadingAlert isLoading={isLoading} />
      <ErrorAlert error={error} />
      <EntryList entries={entries} />
    </div>
  )
}
