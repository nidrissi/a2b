import React, { useRef, useState } from 'react';
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
  // good = biblatex, bad = bibtex
  const goodMode = settings.mode === 'biblatex';

  // get the key and the list of authors, separated by 'and'
  const { key, authorList } = splitAuthors({ authors: entry.authors, year: entry.year });

  // generate a filename and link to the PDF, if any
  const fileName = (settings.filePrefix ? `${key[0]}/` : '') + `${key}.pdf`;
  const fileLink =
        entry.pdfLink
        ? <a href={entry.pdfLink}>{fileName}</a>
        : fileName;

  // deal with journal ref & doi
  const journalRefLink = <abbr title="Consider converting this entry to @article or something more appropriate.">{entry.journalRef}</abbr>;
  const doiLink = entry.doi ? <a href={`https://dx.doi.org/${entry.doi}`}>{entry.doi}</a> : null;

  // journal name & series in bad mode
  // if in badmode, add the series in parenthesis
  let journal = null;
  if (entry.journal) {
    journal = entry.journal + (!goodMode && entry.series ? ` (${entry.series})` : '');
  }

  // the end result will be this variable
  let pairing = {
    author: authorList,
    date: entry.year,
    title: entry.title,
    [goodMode ? 'journaltitle' : 'journal']: journal,
    series: goodMode ? entry.series : null,
    volume: entry.volume,
    number: entry.number,
  };

  if (entry.id) {
    const fullId = entry.id + (settings.includeVersion ? `v${entry.version}` : '')
    const absURL = `https://arxiv.org/abs/${fullId}`;

    pairing = {
      ...pairing,
      eprint: <a href={absURL}>{fullId}</a>,
      [goodMode ? 'eprinttype' : 'archiveprefix']: 'arXiv',
      [goodMode ? 'eprintclass' : 'primaryclass']: settings.includePrimaryCategory ? entry.primaryCategory : null,
      version: (goodMode && settings.includeVersion) ? entry.version : null,
      url: goodMode ? null : absURL,
    }
  }

  // deal with mode
  if (goodMode) {
    pairing = {
      ...pairing,
      pubstate: entry.pubstate,
      howpublished: entry.journalRef ? journalRefLink : null,
    }
  } else {
    pairing = {
      ...pairing,
      note: (entry.doi || entry.journalRef)
        ? journalRefLink
        : 'Preprint',
    }
  }

  // add at the end regardless of mode
  pairing = {
    ...pairing,
    doi: doiLink,
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
  const [copied, setCopied] = useState(false);
  const onClickCopy = _e => {
    navigator.clipboard.writeText(preRef.current.innerText);
    setCopied(true);
  };

  const settings = useSelector(state => state.settings);

  const formattedEntry = formatEntry(buildPairing({ entry, settings }));

  return (
    <Card body bg="light" text="dark">
      <Button onClick={onClickCopy} className="float-right">
        <FontAwesomeIcon icon={copied ? "check" : "clipboard"} />
        {' '}
        {copied ? 'Copied!' : 'Copy'}
      </Button>
      <pre
        ref={preRef}
        className="m-0"
      >
        {formattedEntry}
      </pre>
    </Card>
  )
}
