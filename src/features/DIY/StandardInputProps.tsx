import React from "react";
import { Field } from "formik";
import Col from "react-bootstrap/Col";
import BForm from "react-bootstrap/Form";

import TooltipedInput from "./TooltipedInput";

export type StandardInputProps = {
  as?: string;
  help?: string | JSX.Element;
  label: string;
  name: string;
  placeholder?: string;
  totalColumns?: number;
  type?: string;
};

/** Standard inputs.
    @param totalColumns The total number of columns for the input. Two columns will be reserved for the label.
    @param label The text of the label
    @param help The help text, if any.
    @param ...props The rest of the props, passed to the input.
 */
const StandardInput: React.FC<StandardInputProps> = ({
  totalColumns = 12,
  label,
  help,
  ...props
}) => {
  const labelColumns = 2;
  const inputColumns = totalColumns - labelColumns;

  const field = <Field {...props} id={props.name} className="form-control" />;

  // if there is a help text we put it in a tooltip, otherwise we keep the field
  const input = help ? (
    <TooltipedInput id={props.name} help={help} children={field} />
  ) : (
    field
  );

  return (
    <>
      <BForm.Label column sm={labelColumns} htmlFor={props.name}>
        {label}
      </BForm.Label>
      <Col sm={inputColumns}>{input}</Col>
    </>
  );
};
export default StandardInput;
