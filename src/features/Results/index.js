import React from 'react';

import EntryList from './EntryList';
import ErrorAlert from './ErrorAlert';

export default function Results() {
  return (
    <div>
      <ErrorAlert />
      <EntryList />
    </div>
  )
}
