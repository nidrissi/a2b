import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

// these components are always loaded
import Footer from "./features/Footer";
import AppNavbar from "./features/AppNavbar";

// state
import { selectSettings } from "./features/Settings/settingsSlice";
import {
  selectIds,
  selectAuthors,
  selectTitles,
} from "./features/SearchForm/searchFormSlice";
import { fetchEntries } from "./features/Results/resultsSlice";

// lazy loaded components
const DIY = React.lazy(() => import("./features/DIY"));
const Error404 = React.lazy(() => import("./features/Error404"));
const Help = React.lazy(() => import("./features/Help"));
const Search = React.lazy(() => import("./features/Search"));
const Settings = React.lazy(() => import("./features/Settings"));

const App: React.FC<{}> = () => {
  // keep here to avoid re-fetching on route change
  const dispatch = useDispatch();
  // query
  const ids = useSelector(selectIds);
  const authors = useSelector(selectAuthors);
  const titles = useSelector(selectTitles);
  // settings
  const { maxResults, sortBy, sortOrder } = useSelector(selectSettings);

  useEffect(() => {
    if (authors.length > 0 || ids.length > 0 || titles.length > 0) {
      dispatch(fetchEntries());
    }
  }, [dispatch, ids, authors, titles, maxResults, sortBy, sortOrder]);

  return (
    <Container>
      <Router>
        <AppNavbar />
        <Suspense
          fallback={
            <div className="text-center h1">
              <Spinner animation="grow" /> Loading…
            </div>
          }
        >
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
              <Error404 />
            </Route>
          </Switch>
        </Suspense>
      </Router>
      <Footer />
    </Container>
  );
};
export default App;
