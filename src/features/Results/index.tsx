import React from "react";

import EntryList from "./EntryList";
import ErrorAlert from "./ErrorAlert";

/** The full results component. Displays an error if any and then the
 * list of all found entries.
 */
const Results: React.FC<{}> = () => {
  return (
    <div>
      <ErrorAlert />
      <EntryList />
    </div>
  );
};
export default Results;
