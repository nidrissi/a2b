import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import faq from './faq';

/** One entry of the FAQ.
 * @param eventKey The key, should be unique and valid as an HTML id.
 * @param q The question asked.
 * @param a The answer to the question.
 */
function Entry({ eventKey, q, a }) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} className="p-2" eventKey={eventKey}>
        <Button variant="link" className="p-0">{q}</Button>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>{a}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

/** One section of the FAQ.
 * @param title The title of the section.
 * @param entries The list of entries in the section.
 */
function Section({ title, entries }) {
  return (
    <>
      <h2>{title}</h2>
        {entries.map(({ key, q, a }) =>
          <Entry key={key} eventKey={key} q={q} a={a} />
        )}
    </>
  )
}

/** The FAQ entries, taken from `faq`. */
function Body() {
  return (
    <Accordion>
      {faq.map((props) =>
        <Section {...props} />
      )}
    </Accordion>
  );
}

/** The full `Help` component. Contains a table of contents and the entries from `faq`. */
export default function Help() {
  return (
    <>
      <h1>Help</h1>
      <Body />
    </>
  )
}
