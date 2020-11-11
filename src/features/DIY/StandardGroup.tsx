import React from "react";

import BForm from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import StandardInput, { StandardInputProps } from "./StandardInputProps";

/** Standard input group fields. 
    @param props All parameters are passed to a `StandardInput`.
 */
const StandardGroup: React.FC<StandardInputProps> = (props) => {
  return (
    <BForm.Group as={Row}>
      <StandardInput totalColumns={12} {...props} />
    </BForm.Group>
  );
};
export default StandardGroup;
