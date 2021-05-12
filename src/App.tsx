import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

// these components are always loaded
import { Page } from "./Page";
import Footer from "./features/Footer";
import Navbar from "./features/Navbar";

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
    <>
      <Router>
        <Navbar />
        <div className="container mx-auto">
          <Suspense
            fallback={
              <div className="text-center text-xl font-bold">Loading…</div>
            }
          >
            <Switch>
              <Route path="/" exact>
                <Page title="Search">
                  <Search />
                </Page>
              </Route>
              <Route path="/settings">
                <Page title="Settings">
                  <Settings />
                </Page>
              </Route>
              <Route path="/help">
                <Page title="Help">
                  <Help />
                </Page>
              </Route>
              <Route path="/about">
                <Redirect to="/help" />
              </Route>
              <Route path="/diy">
                <Page title="Do It Yourself">
                  <DIY />
                </Page>
              </Route>
              <Route path="*">
                <Page title="Not Found">
                  <Error404 />
                </Page>
              </Route>
            </Switch>
          </Suspense>{" "}
        </div>
      </Router>
      <Footer />
    </>
  );
};
export default App;
