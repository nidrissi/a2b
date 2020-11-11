import React from "react";

import HelpBody from "./HelpBody";

/** The full `Help` component. Contains a table of contents and the entries from `faq`. */
const Help: React.FC<{}> = () => {
  return (
    <>
      <h1>Help</h1>
      <HelpBody />
    </>
  );
};
export default Help;
