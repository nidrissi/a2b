import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import faq from './faq';

/** The FAQ entries, taken from `faq`. */
function FAQBody() {
  return (
    <>
      {faq.map(({ title, key, entries }) => (
        <React.Fragment key={key}>
          <h2>{title}</h2>
          <Accordion>
            {entries.map(({ key, q, a }) => (
              <Card key={key}>
                <Accordion.Toggle as={Card.Header} className="p-2" eventKey={key}>
                  <Button variant="link" className="p-0">{q}</Button>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={key}>
                  <Card.Body>{a}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </React.Fragment>
      ))}
    </>
  );
}

/** The full `Help` component. Contains a table of contents and the entries from `faq`. */
export default function Help() {
  return (
    <>
      <h1>Help</h1>
      <FAQBody />
    </>
  )
}
