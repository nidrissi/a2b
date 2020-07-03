import React from 'react';

export function splitAuthors({authors, year}) {
  // deal with authors
  // transforms something like ['Jane Doe', 'John Dew'] into "Doe, Jane and Dew, John"
  // and key = "DoeDew"
  const splitAuthors = authors.map(a => a.split(' '));
  const key = splitAuthors.map(l => l[l.length - 1]).join('') + year.toString();
  const authorList = splitAuthors.map(l => l[l.length - 1] + ', ' + l.slice(0, -1).join(' ')).join(' and ');
  return { key, authorList };
}

export function formatEntry({ pairing, key }) {
  // the longest key
  const maxKeyLength = Math.max(...Object.keys(pairing).map(s => s.length));

  // pad the abstract
  if (pairing.abstract) {
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
