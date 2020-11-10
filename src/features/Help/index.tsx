import React from "react";
import ReactDOMServer from "react-dom/server";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import faq, { HelpEntryProps, HelpSectionProps } from "./faq";

/** One entry of the FAQ.
 * @param q The question asked.
 * @param a The answer to the question.
 */
const HelpEntry: React.FC<HelpEntryProps> = ({ q, a }) => {
  const s = typeof q === "string" ? q : ReactDOMServer.renderToStaticMarkup(q);
  const key = s.replace(/\W+/g, "_");
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} className="p-2" eventKey={key}>
        <Button variant="link" className="p-0">
          {q}
        </Button>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={key}>
        <Card.Body>{a}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

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

/** The full `Help` component. Contains a table of contents and the entries from `faq`. */
const Help: React.FC<{}> = () => {
  return (
    <>
      <h1>Help</h1>
      <HelpBody />
    </>
  );
};
export default Help;
