import React from 'react';

import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container>
      <p>Hello!</p>
      <footer className="text-center">
        <hr />
        <p>
          arXiv2bib v{process.env.REACT_APP_VERSION} &bull; maintained by <a href="https://idrissi.eu">Najib Idrissi</a>
        </p>
      </footer>
    </Container>
  );
}

export default App;
