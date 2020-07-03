import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function splitAuthors({authors, year}) {
  // deal with authors
  // transforms something like ['Jane Doe', 'John Dew'] into "Doe, Jane and Dew, John"
  // and key = "DoeDew"
  const splitAuthors = authors.map(a => a.split(' '));
  const key = splitAuthors.map(l => l[l.length - 1]).join('') + year.toString();
  const authorList = splitAuthors.map(l => l[l.length - 1] + ', ' + l.slice(0, -1).join(' ')).join(' and ');
  return { key, authorList };
}

function formatEntry({ type, pairing, key }) {
  // the longest key
  const maxKeyLength = Math.max(...Object.keys(pairing).map(s => s.length));

  // pad the abstract
  if (pairing.abstract) {
    pairing.abstract = pairing.abstract.replace(/\n/g, "\n" + ' '.repeat(maxKeyLength + 6));
  }

  // not great but better than before...
  return (
    <>
      {`@${type}{${key},\n`}
      {Object.keys(pairing).map(key => (
        <React.Fragment key={key}>
          {'  ' /* indent by 2 */}
          {key}
          {' '.repeat(maxKeyLength - key.length)}
          {' = {'}
          {pairing[key]}
          {"},\n"}
        </React.Fragment>
      ))}
      {'}'}
    </>
  );
}

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

  // deal with mode
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

  return { type: entry.type, pairing, key };
}

export default function Entry({ entry }) {
  // for the clipboard
  const preRef = useRef();
  const onClickCopy = _e => {
    navigator.clipboard.writeText(preRef.current.innerText)
  };

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
