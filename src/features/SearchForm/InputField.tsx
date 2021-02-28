import React from "react";
import { useField } from "formik";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group as={Row}>
      <Form.Label htmlFor={props.name} column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          id={props.name}
          {...field}
          {...props}
          isInvalid={Boolean(meta.error)}
        />
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  );
};
export default InputField;
