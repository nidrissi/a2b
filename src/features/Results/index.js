import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import {
  selectError,
  selectIsLoading,
  selectEntries,
  fetchEntries,
} from './resultsSlice';

import {
  selectIdList,
} from '../SearchForm/searchFormSlice';

import EntryList from './EntryList';

function LoadingAlert({ isLoading = false }) {
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

function ErrorAlert({ error }) {
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

export default function Results() {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const entries = useSelector(selectEntries);

  const idList = useSelector(selectIdList);
  useEffect(() => {
    if (idList) {
      dispatch(fetchEntries(idList));
    }
  }, [dispatch, idList])

  return (
    <div>
      <LoadingAlert isLoading={isLoading} />
      <ErrorAlert error={error} />
      <EntryList entries={entries} />
    </div>
  )
}
