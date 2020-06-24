import React from 'react';
import Container from 'react-bootstrap/Container';

import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';

function App() {
  return (
    <Container>
      <MyNavbar />
      <p>Hello!</p>
      <Footer />
    </Container>
  );
}

export default App;
