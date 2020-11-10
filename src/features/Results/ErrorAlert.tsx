import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Alert from "react-bootstrap/Alert";

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
    <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
      {String(error)}
    </Alert>
  );
};
export default ErrorAlert;
