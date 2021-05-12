import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectError, clearError } from "./resultsSlice";

/** A generic error alert. The error is taken from the redux state and
 * displayed, if any.
 */
const ErrorAlert: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  if (!error) {
    return null;
  }
  return (
    <div className="bg-red-100 text-red-900 p-2 rounded-lg my-2 flex">
      <div className="flex-grow">{String(error)}</div>
      <div>
        <button onClick={() => dispatch(clearError)}>&times;</button>
      </div>
    </div>
  );
};
export default ErrorAlert;
