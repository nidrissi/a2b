import React, { useState } from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type StandardInputProps = {
  as?: string;
  help?: string | JSX.Element;
  label: string;
  name: string;
  placeholder?: string;
  halfSize?: boolean;
  type?: string;
};

const Tooltip: React.FC<{ help?: string | JSX.Element }> = ({ help }) => {
  const [shown, setShown] = useState(false);
  if (help) {
    return (
      <>
        <button
          className="ml-1 p-2 cursor-help"
          onFocus={() => setShown(true)}
          onBlur={() => setShown(false)}
          onMouseOver={() => setShown(true)}
          onMouseOut={() => setShown(false)}
        >
          <FontAwesomeIcon icon="question-circle" title="Help" />
        </button>
        <div
          className={`${
            shown ? "block" : "hidden"
          } absolute mt-1 z-10 w-48 bg-gray-200 rounded-md p-1`}
        >
          {help}
        </div>
      </>
    );
  } else {
    return null;
  }
};

/** Standard inputs.
 * @param halfSize Controls whether the input is half-size or full-size.
 * @param label The text of the label.
 * @param help The help text, if any.
 * @param ...props The rest of the props, passed to the input.
 */
const StandardInput: React.FC<StandardInputProps> = ({
  halfSize,
  label,
  help,
  ...props
}) => {
  const field = <Field {...props} id={props.name} className="w-full" />;

  return (
    <>
      <label className="block col-span-full sm:col-span-2" htmlFor={props.name}>
        {label}
        <Tooltip help={help} />
      </label>
      <div
        className={`col-span-full ${
          halfSize ? "sm:col-span-4" : "sm:col-span-10"
        }`}
      >
        {field}
      </div>
    </>
  );
};
export default StandardInput;
