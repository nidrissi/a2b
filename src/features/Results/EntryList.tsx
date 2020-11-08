import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectEntryIds,
  selectTotalEntriesFound,
} from './resultsSlice';
import { selectMode } from '../Settings/settingsSlice';

import EntryById from './EntryById';

/** The list of all entries. Entry ids are taken from the redux state
 * and then rendered using `EntryById`. Then adds buttons to copy entries 
 * to the clipboards and counts how many are displayed out of the total.
 */
const EntryList: React.FC<{}> = () => {
  const entryIds = useSelector(selectEntryIds);
  const mode = useSelector(selectMode);

  const renderedEntries = entryIds.map(id =>
    <EntryById
      key={id}
      entryId={String(id)}
    />
  );

  const outerRef = useRef<HTMLDivElement>(null);
  const getResult = (): string => {
    if (!outerRef.current) { return '' }
    const result = [];
    for (const pre of Array.from(outerRef.current.getElementsByTagName('pre'))) {
      result.push(pre.innerText);
    }
    return result.join("\n\n");
  };
  const onClickCopyAll = (_e: any) => {
    navigator.clipboard.writeText(getResult())
  };
  const onClickDownloadAll = (_e: any) => {
    const result = getResult();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
    element.setAttribute('download', "references.bib");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <FontAwesomeIcon icon="check" className="mr-1" />
        {totalText}
        <Button
          size='sm'
          variant='success'
          className='float-right mx-1'
          onClick={onClickCopyAll}
        >
          <FontAwesomeIcon icon="clipboard" /> Copy all
        </Button>
        <Button
          size='sm'
          variant='success'
          className='float-right mx-1'
          onClick={onClickDownloadAll}
        >
          <FontAwesomeIcon icon="save" /> Download all
        </Button>
      </Alert>
      {renderedEntries}
    </div>
  );
};
export default EntryList;
