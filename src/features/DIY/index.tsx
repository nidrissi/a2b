import React from "react";

import { Formik, Form } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  GenericPreFields,
  GenericPostFields,
  SpecificFields,
  FormValues,
} from "./data";
import FormattedEntry from "./FormattedEntry";

const initialValues = {
  type: "Article",
  authors: "",
  title: "",
  mainTitle: "",
  date: "",
  subTitle: "",
  journal: "",
  series: "",
  number: "",
  volume: "",
  publisher: "",
  location: "",
  ISBN: "",
  pageTotal: "",
  pubstate: "",
  id: "",
  doi: "",
  issue: "",
};

/** The body of the `DIY` component.
 * @param values The values provided by Formik.
 */
const DIYBody: React.FC<{ values: FormValues }> = ({ values }) => {
  return (
    <div>
      <FormattedEntry values={values} />
      <br />
      <Form className="grid grid-cols-12 items-center gap-x-4 gap-y-2">
        <GenericPreFields />
        <SpecificFields type={values.type} />
        <GenericPostFields />
        <button
          type="reset"
          className="bg-gray-300 block col-span-full p-2 rounded-md"
        >
          <FontAwesomeIcon icon="trash-alt" /> Clear
        </button>
      </Form>
    </div>
  );
};

/** The DIY component: turns values inputted in a form into a formatted entry.
 */
const DIY: React.FC<{}> = () => {
  return (
    <>
      <div className="bg-yellow-100 p-3" role="alert">
        <FontAwesomeIcon icon="exclamation-triangle" />
        &nbsp;Not feature complete yet!
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          return;
        }}
        component={DIYBody}
      />
    </>
  );
};
export default DIY;
