import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './features/About';
import Err404 from './features/Err404';
import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';
import Search from './features/Search';

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-170792065-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  })

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
