import React from "react";
import { useField } from "formik";

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
    <>
      <div className="col-span-full sm:col-span-1">
        <label htmlFor={props.name}>{label}</label>
      </div>
      <div className="col-span-full sm:col-span-5 sm:flex gap-2">
        <input
          className={`w-full rounded-md ${
            meta.error ? "border-red-600" : null
          }`}
          type="text"
          id={props.name}
          {...field}
          {...props}
        />
        {meta.error ? (
          <div className="text-sm text-red-600">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
export default InputField;
