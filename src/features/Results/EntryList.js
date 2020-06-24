import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Entry({ authors, id, title, year }) {
  // deal with authors
  // transforms something like ['Jane Doe', 'John Dew'] into "Doe, Jane and Dew, John"
  // and key = "DoeDew"
  const splitAuthors = authors.map(a => a.split(' '));
  const key = splitAuthors.map(l => l[l.length - 1]).join('');
  const authorList = splitAuthors.map(l => l[l.length - 1] + ', ' + l.slice(0, -1).join(' ')).join(' and ');

  const formattedEntry = `@Misc{${key}${year},
  date       = {${year}},
  authors    = {${authorList}},
  title      = {${title}},
  eprint     = {${id}},
  eprinttype = {arXiv},
  pubstate   = {prepublished},
  file       = {${key[0]}/${key}${year}.pdf}
}`;

  return (
    <Alert variant="dark">
      <pre className="m-0">
        {formattedEntry}
      </pre>
    </Alert>
  )
}

export default function EntryList({ entries }) {
  const renderedEntries = entries.map(e =>
    <Entry
      key={e.id}
      authors={e.authors}
      id={e.id}
      title={e.title}
      year={e.year}
    />
  );
  return <div>{renderedEntries}</div>
}
