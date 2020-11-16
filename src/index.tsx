import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClipboard,
  faCheck,
  faCog,
  faQuestion,
  faQuestionCircle,
  faSave,
  faSearch,
  faTools,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faClipboard,
  faCheck,
  faCog,
  faQuestion,
  faQuestionCircle,
  faSave,
  faSearch,
  faTools,
  faTrashAlt
);

ReactGA.initialize("G-EVTG00G3Z9");
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
