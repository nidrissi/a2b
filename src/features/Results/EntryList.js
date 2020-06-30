import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectEntries,
  selectTotalEntriesFound,
} from './resultsSlice';

import Entry from './Entry';

export default function EntryList() {
  const entries = useSelector(selectEntries);
  const uniqueEntries = [...new Set(entries)];
  const renderedEntries = uniqueEntries.map(e =>
    <Entry
      key={e.id}
      entry={e}
    />
  );

  const totalEntriesFound = useSelector(selectTotalEntriesFound);
  const totalText =
        totalEntriesFound !== null
        ? <p>Showing {entries.length} entries out of {totalEntriesFound} in total.</p>
        : null;

  return (
    <div>
      {totalText}
      {renderedEntries}
    </div>
  );
}
