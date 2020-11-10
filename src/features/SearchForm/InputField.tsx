import React from "react";
import { useField } from "formik";
import Col from "react-bootstrap/Col";
import BForm from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

/** Generic input fields for SearchForm.
    @param label The label of the input field.
    @param ...props The rest of the parameters, will be passed to a controlled input.
 */
type InputFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
};
export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <BForm.Group as={Row}>
      <BForm.Label htmlFor={props.name} column sm={2}>
        {label}
      </BForm.Label>
      <Col sm={10}>
        <BForm.Control
          id={props.name}
          {...field}
          {...props}
          isInvalid={Boolean(meta.error)}
        />
        <BForm.Control.Feedback type="invalid">
          {meta.error}
        </BForm.Control.Feedback>
      </Col>
    </BForm.Group>
  );
};
