import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import faq, { FAQEntryProps, FAQSectionProps } from './faq';

/** One entry of the FAQ.
 * @param myKey The key, should be unique and valid as an HTML id.
 * @param q The question asked.
 * @param a The answer to the question.
 */
const FAQEntry: React.FC<FAQEntryProps> = ({ myKey, q, a }) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} className="p-2" eventKey={myKey}>
        <Button variant="link" className="p-0">{q}</Button>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={myKey}>
        <Card.Body>{a}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

/** One section of the FAQ.
 * @param title The title of the section.
 * @param entries The list of entries in the section.
 */
const FAQSection: React.FC<FAQSectionProps> = ({ title, entries }) => {
  return (
    <>
      <h2>{title}</h2>
      {entries.map(({ myKey, q, a }) =>
        <FAQEntry key={myKey} myKey={myKey} q={q} a={a} />
      )}
    </>
  )
};

/** The FAQ entries, taken from `faq`. */
const Body: React.FC<{}> = () => {
  return (
    <Accordion>
      {faq.map((props) =>
        <FAQSection {...props} />
      )}
    </Accordion>
  );
};

/** The full `Help` component. Contains a table of contents and the entries from `faq`. */
const Help: React.FC<{}> = () => {
  return (
    <>
      <h1>Help</h1>
      <Body />
    </>
  )
};
export default Help;
