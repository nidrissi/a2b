import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Entry({ id }) {
  return (
    <Alert variant="dark">
      <pre className="m-0">{`@Misc{
    ${id}
}`}
      </pre>
    </Alert>
  )
}

export default function EntryList({ entries }) {
  const renderedEntries = entries.map(e =>
    <Entry key={e.id} id={e.id} />
  );
  return <div>{renderedEntries}</div>
}
