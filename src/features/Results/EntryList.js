import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectEntryIds,
  selectTotalEntriesFound,
} from './resultsSlice';
import { selectMode } from '../Settings/settingsSlice';

import EntryById from './EntryById';

export default function EntryList() {
  const entryIds = useSelector(selectEntryIds);
  const mode = useSelector(selectMode);

  const renderedEntries = entryIds.map(id =>
    <EntryById
      key={id}
      entryId={id}
    />
  );

  const outerRef = useRef();
  const onClickCopyAll = _e => {
    const result = [];
    for (const pre of outerRef.current.getElementsByTagName('pre')) {
      result.push(pre.innerText);
    }
    navigator.clipboard.writeText(result.join("\n\n"))
  };

  const totalEntriesFound = useSelector(selectTotalEntriesFound);
  const totalText =
        <>
          Showing {entryIds.length} entries out of {totalEntriesFound} in total.
          {mode === 'bibtex' ? <span className="text-danger"> Running in legacy BibTeX mode. Check entries for issues.</span> : null}
        </>;

  // null means that entries haven't been fetched yet
  return (totalEntriesFound === null) ? null : (
    <div ref={outerRef}>
      <Alert variant="success">
        <Alert.Link
          onClick={onClickCopyAll}
          className="float-right"
        >
          <FontAwesomeIcon icon="clipboard" /> Copy all
        </Alert.Link>
        <FontAwesomeIcon icon="check" className="mr-1" />
        {totalText}
      </Alert>
      {renderedEntries}
    </div>
  );
}
