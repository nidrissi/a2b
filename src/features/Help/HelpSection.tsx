import React from "react";
import { HelpSectionProps } from "./faq";
import HelpEntry from "./HelpEntry";

/** One section of the FAQ.
 * @param title The title of the section.
 * @param entries The list of entries in the section.
 */
const HelpSection: React.FC<HelpSectionProps> = ({ title, entries }) => {
  return (
    <>
      <h2>{title}</h2>
      {entries.map((props, i) => (
        // I can use the index as a key since the FAQ never changes
        <HelpEntry key={i} {...props} />
      ))}
    </>
  );
};
export default HelpSection;
