import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Entry({ entry }) {
  // deal with authors
  // transforms something like ['Jane Doe', 'John Dew'] into "Doe, Jane and Dew, John"
  // and key = "DoeDew"
  const splitAuthors = entry.authors.map(a => a.split(' '));
  const key = splitAuthors.map(l => l[l.length - 1]).join('');
  const authorList = splitAuthors.map(l => l[l.length - 1] + ', ' + l.slice(0, -1).join(' ')).join(' and ');

  const fileLink = (
    <a href={entry.pdfLink}>
      {key[0]}/{key}{entry.year}.pdf
    </a>
  );

  // very ugly ☹
  return (
    <Alert variant="dark">
      <pre className="m-0">
        {`@Misc{${key}${entry.year},
  date       = {${entry.year}},
  author     = {${authorList}},
  title      = {${entry.title}},
  eprint     = {${entry.id}},
  eprinttype = {arXiv},
  pubstate   = {prepublished},
  file       = {`}
        {fileLink}
        {`}
}`}
      </pre>
    </Alert>
  )
}

export default function EntryList({ entries }) {
  const renderedEntries = entries.map(e =>
    <Entry
      key={e.id}
      entry={e}
    />
  );
  return <div>{renderedEntries}</div>
}
