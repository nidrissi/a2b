import React from 'react';

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        This tool is designed to produce a biblatex entry from an arXiv id.
        It is in a very preliminary state and probably full of bugs.
        There are no tests and pretty much no error handling in the code.
        Caveat emptor!
      </p>
      <p>
        The source is <a href="https://github.com/nidrissi/arxiv2bib">available on GitHub</a> and the code is licensed under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3</a>.
        Feel free to <a href="https://github.com/nidrissi/arxiv2bib/issues">report issues there</a>.
      </p>
    </div>
  )
}
