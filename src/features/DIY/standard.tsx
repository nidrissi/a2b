import React from "react";
import { Field } from "formik";

import Col from "react-bootstrap/Col";
import BForm from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Adds a tooltip to an input.
    @param children The input to be tooltip.
    @param help The help text.
 */
const TooltipedInput: React.FC<{ help: string | JSX.Element; id: string }> = ({
  children,
  help,
  id,
}) => {
  return (
    <InputGroup>
      {children}
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-" + id}>{help}</Tooltip>}
      >
        <InputGroup.Append>
          <InputGroup.Text>
            <FontAwesomeIcon icon="question-circle" />
          </InputGroup.Text>
        </InputGroup.Append>
      </OverlayTrigger>
    </InputGroup>
  );
};

/** Standard inputs.
    @param totalColumns The total number of columns for the input. Two columns will be reserved for the label.
    @param label The text of the label
    @param help The help text, if any.
    @param ...props The rest of the props, passed to the input.
 */
export type StandardInputProps = {
  as?: string;
  help?: string | JSX.Element;
  label: string;
  name: string;
  placeholder?: string;
  totalColumns?: number;
  type?: string;
};
export const StandardInput: React.FC<StandardInputProps> = ({
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

/** Standard input group fields. 
    @param props All parameters are passed to a `StandardInput`.
 */
export const StandardGroup: React.FC<StandardInputProps> = (props) => {
  return (
    <BForm.Group as={Row}>
      <StandardInput totalColumns={12} {...props} />
    </BForm.Group>
  );
};
