import React from 'react';

export default function Footer() {
  const version = process.env.REACT_APP_VERSION.replace('-alpha', 'ɑ').replace('-beta', 'β')

  return (
    <footer className="text-center">
      <hr />
      <p>
        arXiv2bib v{version} &bull; maintained by <a href="https://idrissi.eu">Najib Idrissi</a>
      </p>
    </footer>

  );
}
