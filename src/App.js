import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';

function App() {
  return (
    <Container>
      <Router>
        <MyNavbar />
        <Switch>
          <Route path="/" exact>
            <p>Hello!</p>
          </Route>
          <Route path="/about">
            <p>About?!</p>
          </Route>
          <Route path="*">
            <p>404</p>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
}

export default App;
