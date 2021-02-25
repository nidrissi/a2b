import React from "react";
import BForm from "react-bootstrap/Form";
import { Field } from "formik";

type SettingFieldProps = {
  as: "checkbox" | "select" | "control";
  id: string;
  label: string | JSX.Element;
  disabled?: boolean;
  margin?: number;
};
export const SettingField: React.FC<SettingFieldProps> = ({
  as,
  id,
  label,
  disabled,
  children,
}) => {
  let result;
  if (as === "control") {
    result = (
      <>
        <BForm.Label htmlFor={id}>{label}</BForm.Label>
        <Field className="form-control" name={id} id={id} disabled={disabled} />
      </>
    );
  } else if (as === "checkbox") {
    result = (
      <Field
        as={BForm.Check}
        type="checkbox"
        id={id}
        name={id}
        label={label}
        disabled={disabled}
      />
    );
  } else if (as === "select") {
    result = (
      <>
        <BForm.Label htmlFor={id}>{label}</BForm.Label>
        <Field
          className="form-control"
          as="select"
          name={id}
          id={id}
          disabled={disabled}
        >
          {children}
        </Field>
      </>
    );
  } else {
    // hopefully won't happen...
    throw Error("Bad type of SettingField");
  }
  return <BForm.Group>{result}</BForm.Group>;
};
