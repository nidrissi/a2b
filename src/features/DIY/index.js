import React from 'react';

import { Formik, Form, useFormikContext } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import BForm from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Entry from '../Entry';
import { GenericPreFields, GenericPostFields, SpecificFields } from './data';

/** Takes values from the Formik context, creates an entry and formats it with `Entry`.
 */
function FormattedEntry() {
  const { values } = useFormikContext();
  // split on &, delete empty values, and trim
  const authors = values.authors.split('&').filter(s => s).map(s => s.trim());
  const entry = {
    ...values,
    authors,
    year: values.year || 0,
  }
  return <Entry entry={entry} />
}

const initialValues = {
  type: 'Article',
  authors: '',
  title: '',
  mainTitle: '',
  year: '',
  subTitle: '',
  journal: '',
  series: '',
  number: '',
  volume: '',
  publisher: '',
  location: '',
  ISBN: '',
  pageTotal: '',
  pubstate: '',
  id: '',
  doi: '',
};

/** The body of the `DIY` component. This is _not_ a component, it is
 * a function to be used as the children of `Formik`.
 * @param values The values provided by Formik.
 */
function diyBody({ values }) {
  return (
    <>
      <FormattedEntry />
      <br />
      <Form>
        <GenericPreFields />
        <SpecificFields type={values.type} />
        <GenericPostFields />
        <BForm.Group>
          <Button
            type="reset"
            variant="secondary"
            block
          >
            <FontAwesomeIcon icon="trash-alt" /> Clear
          </Button>
        </BForm.Group>
      </Form>
    </>
  )
}

/** The DIY component: turns values inputted in a form into a formatted entry.
 */
export default function DIY() {
  return (
    <>
      <h1>Do It Yourself</h1>
      <Alert variant="warning">Not feature complete yet!</Alert>
      <Formik
        initialValues={initialValues}
      >
        {diyBody}
      </Formik>
    </>
  );
}
