import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Container from 'react-bootstrap/Container';

// my components
import About from './features/About';
import Err404 from './features/Err404';
import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';
import Search from './features/Search';

// state
import {
  selectIds,
  selectAuthors,
  selectTitles,
} from './features/SearchForm/searchFormSlice';
import { fetchEntries } from './features/Results/resultsSlice';

// GA
import ReactGA from 'react-ga';
const history = createBrowserHistory()
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
});

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, []);

  // keep here to avoid re-fetching on route change
  const dispatch = useDispatch();
  const ids = useSelector(selectIds);
  const authors = useSelector(selectAuthors);
  const titles = useSelector(selectTitles);

  useEffect(() => {
    if (authors.length > 0 || ids.length > 0 || titles.length > 0) {
      dispatch(fetchEntries({ authors, ids, titles }));
    }
  }, [dispatch, ids, authors, titles])


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
