import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import Container from 'react-bootstrap/Container';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import About from './features/About';
import Err404 from './features/Err404';
import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';
import Search from './features/Search';

const history = createBrowserHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
});

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, []);

  return (
    <Container>
      <Router history={history}>
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
