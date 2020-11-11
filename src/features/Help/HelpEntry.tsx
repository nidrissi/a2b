import React from "react";
import ReactDOMServer from "react-dom/server";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { HelpEntryProps } from "./faq";

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
export default HelpEntry;
