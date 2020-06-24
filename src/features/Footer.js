import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center">
      <hr />
      <p>
        arXiv2bib v{process.env.REACT_APP_VERSION} &bull; maintained by <a href="https://idrissi.eu">Najib Idrissi</a>
      </p>
    </footer>

  );
}
