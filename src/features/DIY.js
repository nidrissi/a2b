import React from 'react';

import Entry from './Entry';

export default function DIY() {
  const entry = {
    type: 'Misc',
    authors: ['Joe Doe'],
    year: 0
  };
  return (
    <>
      <h1>Do It Yourself</h1>
      <Entry entry={entry} />
    </>
  );
}
