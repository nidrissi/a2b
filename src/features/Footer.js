import React from 'react';

export default function Footer() {
  const version = process.env.REACT_APP_VERSION.replace('-alpha', 'ɑ').replace('-beta', 'β')

  return (
    <footer className="text-center">
      <hr />
      <p>
        arXiv2bib v{version} • licensed under AGPLv3 • <a href="https://github.com/nidrissi/arxiv2bib">source</a>
      </p>
    </footer>

  );
}
