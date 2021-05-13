import React, { useState } from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type StandardInputProps = {
  as?: string;
  help?: string | JSX.Element;
  label: string;
  name: string;
  placeholder?: string;
  totalColumns?: number;
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

  const field = <Field {...props} id={props.name} className="w-full" />;

  return (
    <>
      <label
        className={`block col-span-full sm:col-span-${labelColumns}`}
        htmlFor={props.name}
      >
        {label}
        <Tooltip help={help} />
      </label>
      <div className={`col-span-full sm:col-span-${inputColumns}`}>{field}</div>
    </>
  );
};
export default StandardInput;
