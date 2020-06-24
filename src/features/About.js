import React from 'react';

export default function About() {
  return (
    <div>
      <p>
        This tool is designed to produce a biblatex entry from an arXiv id.
        It is in a very preliminary state and probably full of bugs.
        There are no tests and pretty much no error handling in the code.
        Caveat emptor!
      </p>
      <p>
        It was written by <a href="https://idrissi.eu">Najib Idrissi</a>.
        The source is <a href="https://github.com/nidrissi/arxiv2bib">available on GitHub</a>.
        Feel free to <a href="https://github.com/nidrissi/arxiv2bib/issues">report issues there</a>.
      </p>
    </div>
  )
}
