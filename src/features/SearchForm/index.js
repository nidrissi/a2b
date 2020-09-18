import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, useField } from 'formik';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import BForm from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setQuery } from './searchFormSlice';
import { selectIsLoading } from '../Results/resultsSlice';

/** Splits a string and removes empty entries.
    @param str The string to be split.
    @param rx The regexp along which the string will be split.
 */
function splitter(str, rx) {
  return str.split(rx).filter(s => s !== '');
}

/** Generic input fields for SearchForm.
    @param label The label of the input field.
    @param ...props The rest of the parameters, will be passed to a controlled input.
 */
function InputField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <BForm.Group as={Row}>
      <BForm.Label
        htmlFor={props.name}
        column
        sm={2}
      >
        {label}
      </BForm.Label>
      <Col sm={10}>
        <BForm.Control
          id={props.name}
          {...field}
          {...props}
          isInvalid={meta.error}
        />
        <BForm.Control.Feedback type="invalid">
          {meta.error}
        </BForm.Control.Feedback>
      </Col>
    </BForm.Group>
  );
}

/** The submit and clear buttons used in SearchForm.
    @param isLoading Whether the form is currently loading or not.
 */
function SubmitClearButtons({ isLoading }) {
  return (
    <BForm.Group as={BForm.Row}>
      <Col sm={10}>
        <Button
          disabled={isLoading}
          type="submit"
          block
        >
          {isLoading ?
            <span><Spinner animation="border" size="sm" /> Loading...</span>
            : <span><FontAwesomeIcon icon="search" /> Search</span>}
        </Button>
      </Col>
      <Col>
        <Button
          type="reset"
          variant="secondary"
          block
        >
          <FontAwesomeIcon icon="trash-alt" /> Clear
        </Button>
      </Col>
    </BForm.Group>
  );
}

/** The full search form. It has
    - three fields:
      - the ID list;
      - the author list; 
      - the title (words) list;
    - two buttons: 
      - submit;
      - clear.
 */
export default function SearchForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  return (
    <Formik
      initialValues={{
        ids: '',
        authors: '',
        titles: ''
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (!isLoading) {
          const query = {
            ids: splitter(values.ids, /\s+/), // split on spaces
            authors: splitter(values.authors, /\s*&\s*/), // split on ampersands
            titles: splitter(values.titles, /\s*&\s*/)    // idem
          };
          dispatch(setQuery(query));
          setSubmitting(false);
        }
      }}
      validate={(values) =>{
        const errors = {};
        if (!values.ids && !values.authors && !values.titles) {
          ['ids', 'authors', 'titles'].forEach(s => errors[s] = 'At least one value is required.');
        }
        return errors;
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Form>
        <InputField
          label="ID list"
          name="ids"
          placeholder="ID1 ID2 ..."
          title="List of IDs, separated by spaces. Version will be stripped, e.g. 1911.12281v1 ⇒ 1911.12281."
        />
        <InputField
          name="authors"
          label="Authors"
          placeholder="Henri Poincaré & David Hilbert & ..."
          title="Author(s) separated by '&'."
        />
        <InputField
          name="titles"
          label="Title"
          placeholder="operad & configuration space & ..."
          title="Words/sentences to search in the title separated by '&'."
        />
        <SubmitClearButtons isLoading={isLoading} />
      </Form>
    </Formik>
  );
}
