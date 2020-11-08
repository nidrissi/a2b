import React from 'react';

/** A basic footer that contains version information, licence, and a link to the source. */
const Footer: React.FC<{}> = () => {
  const version: string = process.env.REACT_APP_VERSION!.replace('-alpha', 'ɑ').replace('-beta', 'β');
  const sha: string = process.env.REACT_APP_GITHUB_SHA || 'undefined';

  return (
    <footer className="text-center">
      <hr />
      <p>
        arXiv2BibLaTeX <span title={sha ? `Commit: ${sha}` : ''}>v{version}</span> • licensed under AGPLv3 • <a href="https://github.com/nidrissi/arxiv2bib">source</a>
      </p>
    </footer>
  );
}

export default Footer;
