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
  selectAuthors,
  selectIds,
  selectTitles,
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

  const ids = useSelector(selectIds);
  const authors = useSelector(selectAuthors);
  const titles = useSelector(selectTitles);

  useEffect(() => {
    if (authors.length > 0 || ids.length > 0 || titles.length > 0) {
      dispatch(fetchEntries({ authors, ids, titles }));
    }
  }, [dispatch, ids, authors, titles])

  return (
    <div>
      <LoadingAlert isLoading={isLoading} />
      <ErrorAlert error={error} />
      <EntryList entries={entries} />
    </div>
  )
}
