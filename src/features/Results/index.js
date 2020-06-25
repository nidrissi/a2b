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
  selectAuthor,
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
  const author = useSelector(selectAuthor);

  useEffect(() => {
    if (idList || author) {
      dispatch(fetchEntries({ author, idList }));
    }
  }, [dispatch, idList, author])

  return (
    <div>
      <LoadingAlert isLoading={isLoading} />
      <ErrorAlert error={error} />
      <EntryList entries={entries} />
    </div>
  )
}
