import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './features/About';
import Err404 from './features/Err404';
import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';
import Search from './features/search/Search';

function App() {
  return (
    <Container>
      <Router>
        <MyNavbar />
        <Switch>
          <Route path="/" exact>
            <Search />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <Err404 />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
}

export default App;
