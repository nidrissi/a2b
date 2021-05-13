import React, { useState } from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

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
  return help ? (
    <span
      className="relative"
      onFocus={() => setShown(true)}
      onBlur={() => setShown(false)}
      onMouseOver={() => setShown(true)}
      onMouseOut={() => setShown(false)}
    >
      <button className="p-2 cursor-help">
        <FontAwesomeIcon icon={faQuestionCircle} aria-label="Help" />
      </button>
      <div
        className={`${
          shown ? "block" : "hidden"
        } absolute -top-2 left-0 z-10 w-48 bg-black text-gray-100 rounded-md p-2`}
      >
        <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
        {help}
      </div>
    </span>
  ) : null;
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
        <Field {...props} id={props.name} className="w-full" />
      </div>
    </>
  );
};
export default StandardInput;
