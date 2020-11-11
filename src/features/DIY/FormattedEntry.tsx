import React from "react";
import EntryCard from "../EntryCard";
import { FormValues } from "./data";

/** Takes values from the Formik context, creates an entry and formats it with `Entry`.
 */
const FormattedEntry: React.FC<{ values: FormValues }> = ({ values }) => {
  // split on &, delete empty values, and trim
  const authors = values.authors
    .split("&")
    .filter((s) => s)
    .map((s) => s.trim());
  const entry = {
    ...values,
    volume: Number(values.volume),
    issue: Number(values.issue),
    authors,
    date: values.date || "0000",
  };
  return <EntryCard entry={entry} />;
};
export default FormattedEntry;
