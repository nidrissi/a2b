import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function formatEntry({ entry, settings }) {
  // deal with authors
  // transforms something like ['Jane Doe', 'John Dew'] into "Doe, Jane and Dew, John"
  // and key = "DoeDew"
  const splitAuthors = entry.authors.map(a => a.split(' '));
  const key = splitAuthors.map(l => l[l.length - 1]).join('') + entry.year.toString();
  const authorList = splitAuthors.map(l => l[l.length - 1] + ', ' + l.slice(0, -1).join(' ')).join(' and ');

  const fileLink = (
    <a href={entry.pdfLink}>
      {settings.filePrefix ? `${key[0]}/` : ''}{key}.pdf
    </a>
  );

  // the key is displayed
  const pairing = {
    author: authorList,
    date: entry.year,
    title: entry.title,
    eprint: <a href={`https://arxiv.org/abs/${entry.id}`}>{entry.id}</a>,
    eprinttype: 'arXiv',
    eprintclass: settings.includePrimaryCategory ? entry.primaryCategory : null,
    version: settings.includeVersion ? entry.version : null,
    pubstate: (entry.doi || entry.journaRef) ? null : 'prepublished',
    howpublished: entry.journalRef ? <abbr title="Consider converting this entry to @article or something more appropriate.">{entry.journalRef}</abbr> : null,
    doi: entry.doi,
    file: settings.includeFile ? fileLink : null,
    comment: entry.comment,
    abstract: settings.includeAbstract ? entry.abstract : null,
  };
  // delete all empty values
  Object.keys(pairing).forEach(k => !pairing[k] && delete pairing[k]);

  // the longest key
  const maxKeyLength = Math.max(...Object.keys(pairing).map(s => s.length));

  // pad the abstract
  if (settings.includeAbstract) {
    pairing.abstract = pairing.abstract.replace(/\n/g, "\n" + ' '.repeat(maxKeyLength + 6));
  }

  // not great but better than before...
  return (
    <>
      {`@Misc{${key},\n`}
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
        {formatEntry({ entry, settings })}
      </pre>
    </Card>
  )
}
