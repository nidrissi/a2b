import React from 'react';
import Entry from './Entry';

export default function EntryList({ entries }) {
  const uniqueEntries = [...new Set(entries)];
  const renderedEntries = uniqueEntries.map(e =>
    <Entry
      key={e.id}
      entry={e}
    />
  );
  return <div>{renderedEntries}</div>
}
