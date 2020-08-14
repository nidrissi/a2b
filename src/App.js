import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Switch, Redirect, Route, Router } from 'react-router-dom';

import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

// these components are always loaded
import Footer from './features/Footer';
import MyNavbar from './features/MyNavbar';

// state
import {
  selectMaxResults,
  selectSortBy,
  selectSortOrder,
} from './features/Settings/settingsSlice';
import {
  selectIds,
  selectAuthors,
  selectTitles,
} from './features/SearchForm/searchFormSlice';
import { fetchEntries } from './features/Results/resultsSlice';

// lazy loaded components
const DIY = React.lazy(() => import('./features/DIY'));
const Err404 = React.lazy(() => import('./features/Err404'));
const Help = React.lazy(() => import('./features/Help'));
const Search = React.lazy(() => import('./features/Search'));
const Settings = React.lazy(() => import('./features/Settings'));

// GA
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
  // query
  const ids = useSelector(selectIds);
  const authors = useSelector(selectAuthors);
  const titles = useSelector(selectTitles);
  // settings
  const maxResults = useSelector(selectMaxResults);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  useEffect(() => {
    if (authors.length > 0 || ids.length > 0 || titles.length > 0) {
      dispatch(fetchEntries({ authors, ids, titles }, { maxResults, sortBy, sortOrder }));
    }
  }, [dispatch, ids, authors, titles, maxResults, sortBy, sortOrder])


  return (
    <Container>
      <Router history={history}>
        <MyNavbar />
        <Suspense fallback={<div className="text-center h1"><Spinner animation="grow" /> Loading…</div>}>
          <Switch>
            <Route path="/" exact>
              <Search />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route path="/about">
              <Redirect to="/help" />
            </Route>
            <Route path="/diy">
              <DIY />
            </Route>
            <Route path="*">
              <Err404 />
            </Route>
          </Switch>
        </Suspense>
      </Router>
      <Footer />
    </Container>
  );
}

export default App;
