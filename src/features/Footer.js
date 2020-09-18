import React from 'react';

/** A basic footer that contains version information, licence, and a link to the source. */
export default function Footer() {
  const version = process.env.REACT_APP_VERSION.replace('-alpha', 'ɑ').replace('-beta', 'β');
  const sha = process.env.REACT_APP_GITHUB_SHA;

  return (
    <footer className="text-center">
      <hr />
      <p>
        arXiv2bib <span title={sha ? `Commit: ${sha}` : null}>v{version}</span> • licensed under AGPLv3 • <a href="https://github.com/nidrissi/arxiv2bib">source</a>
      </p>
    </footer>

  );
}
