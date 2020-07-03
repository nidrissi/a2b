import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectEntryById } from './resultsSlice';
import { formatEntry, splitAuthors } from '../../utils/format';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function buildPairing({ entry, settings }) {
  const { key, authorList } = splitAuthors({ authors: entry.authors, year: entry.year });

  const fileLink = (
    <a href={entry.pdfLink}>
      {settings.filePrefix ? `${key[0]}/` : ''}{key}.pdf
    </a>
  );

  // the key is displayed
  let pairing = {
    author: authorList,
    date: entry.year,
    title: entry.title,
  };

  if (settings.mode === 'biblatex') {
    pairing = {
      ...pairing,
      eprint: <a href={`https://arxiv.org/abs/${entry.id}`}>{entry.id}</a>,
      eprinttype: 'arXiv',
      eprintclass: settings.includePrimaryCategory ? entry.primaryCategory : null,
      version: settings.includeVersion ? entry.version : null,
      pubstate: (entry.doi || entry.journalRef) ? null : 'prepublished',
      howpublished: entry.journalRef ? <abbr title="Consider converting this entry to @article or something more appropriate.">{entry.journalRef}</abbr> : null,
    }
  } else if (settings.mode === 'bibtex') {
    pairing = {
      ...pairing,
      eprint: <a href={`https://arxiv.org/abs/${entry.id}`}>{entry.id}v{entry.version}</a>,
      archivePrefix: 'arXiv',
      primaryClass: settings.includePrimaryCategory ? entry.primaryCategory : null,
      note: (entry.doi || entry.journalRef)
        ? <abbr title="Consider converting this entry to @article or something more appropriate.">{entry.journalRef}</abbr>
        : 'Preprint',
      url: `https://arxiv.org/abs/${entry.id}`
    }
  } else {
    throw (Error('Unknown mode (should not happen...)'))
  }

  pairing = {
    ...pairing,
    doi: entry.doi,
    file: settings.includeFile ? fileLink : null,
    comment: entry.comment,
    abstract: settings.includeAbstract ? entry.abstract : null,
  };

  // delete all empty values
  Object.keys(pairing).forEach(k => !pairing[k] && delete pairing[k]);
  return { pairing, key };
}

export default function Entry({ entryId }) {
  // for the clipboard
  const preRef = useRef();
  const onClickCopy = _e => {
    navigator.clipboard.writeText(preRef.current.innerText)
  };

  const entry = useSelector(selectEntryById(entryId));

  const settings = useSelector(state => state.settings);

  return (
    <Card body bg="light" text="dark">
      <Button onClick={onClickCopy} className="float-right">
        <FontAwesomeIcon icon="clipboard" /> Copy
        </Button>
      <pre
        ref={preRef}
        className="m-0"
      >
        {formatEntry(buildPairing({ entry, settings }))}
      </pre>
    </Card>
  )
}
