import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

// Google Analytics
// @ts-ignore
window.dataLayer = window.dataLayer || [];
function gtag() {
  // @ts-ignore
  dataLayer.push(arguments);
}
// @ts-ignore
gtag("js", new Date());
// @ts-ignore
gtag("config", "G-EVTG00G3Z9");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
