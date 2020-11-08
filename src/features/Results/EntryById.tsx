import React from 'react';
import { useSelector } from 'react-redux';

import { selectEntryById } from './resultsSlice';
import EntryCard from '../EntryCard';

/** Takes an entry id, selects it from the redux state, and formats it with `Entry`.
 * @param entryId The id of the entry.
 */
const EntryById: React.FC<{ entryId: string }> = ({ entryId }) => {
  const selectedEntry = useSelector(selectEntryById(entryId));
  if (!selectedEntry) {
    return <>No such entry: {entryId}</>
  } else {
    const entry = {
      ...selectedEntry,
      type: 'Misc'
    };
    return <EntryCard entry={entry} />
  }
};
export default EntryById;
