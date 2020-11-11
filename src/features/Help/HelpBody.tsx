import React from "react";
import Accordion from "react-bootstrap/Accordion";

import faq from "./faq";
import HelpSection from "./HelpSection";

/** The FAQ entries, taken from `faq`. */
const HelpBody: React.FC<{}> = () => {
  return (
    <Accordion>
      {faq.map((props, i) => (
        // I can use the index as a key since the FAQ never changes
        <HelpSection key={i} {...props} />
      ))}
    </Accordion>
  );
};
export default HelpBody;
