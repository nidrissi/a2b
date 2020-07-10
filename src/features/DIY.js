import React from 'react';

import { Formik, Form, Field, useFormikContext } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import BForm from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Entry from './Entry';

function HelpTooltip({ children }) {
  return (
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip>
          {children}
        </Tooltip>
      }
    >
      <FontAwesomeIcon icon="question-circle" />
    </OverlayTrigger>
  );
}

function TooltipedInput({ children, help }) {
  return (
    <InputGroup>
      {children}
      <InputGroup.Append>
        <InputGroup.Text>
          <HelpTooltip>
            {help}
          </HelpTooltip>
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
}

/** Standard inputs
 */
function StandardInput({totalColumns, id, label, help, ...props}) {
  const labelColumns = 2;
  const inputColumns = totalColumns - labelColumns;

  const field = (
    <Field
      {...props}
      id={id}
      className='form-control'
    />
  );

  // if there is a help text we put it in a tooltip, otherwise we keep the field
  const input = help ? <TooltipedInput help={help} children={field} /> : field;

  return (
    <>
      <BForm.Label
        column sm={labelColumns}
        htmlFor={id}
      >
        {label}
      </BForm.Label>
      <Col sm={inputColumns}>
        {input}
      </Col>
    </>
  )
}

/** Standard input group fields
 */
function StandardGroup(props) {
  return (
    <BForm.Group as={Row}>
      <StandardInput totalColumns={12} {...props} />
    </BForm.Group>
  );
}

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

export default function DIY() {
  return (
    <>
      <h1>Do It Yourself</h1>
      <Alert variant="warning">Not feature complete yet!</Alert>
      <Formik
        initialValues={{
          type: 'Article',
          authors: '',
          title: '',
          mainTitle: '',
          year: '',
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
        }}
      >
        {({values}) =>
          <Form>
            {/* common important fields */}
            <StandardGroup as='select' id='type' name='type' label='Type'>
              <option value='Article'>Journal article</option>
              <option value='Book'>Book</option>
              <option value='InProceedings'>Conference/Talk proceedings</option>
              <option value='Misc'>Other</option>
            </StandardGroup>
            <StandardGroup
              id='authors' name='authors'
              label='Authors'
              placeholder='Author names separated by &'
            />
            <StandardGroup
              id='title' name='title'
              label='Title'
            />
            <StandardGroup
              id='year' name='year'
              label='Year'
            />

            {/* @article-specific */}
            <div className={values.type !== 'Article' ? 'd-none' : null}>
              <BForm.Group as={Row}>
                <StandardInput
                  id='journal' name='journal'
                  label='Journal'
                  totalColumns={6}
                />
                <StandardInput
                  id='jseries' name='series'
                  label='Series'
                  totalColumns={6}
                  help={<>The series of the <em>journal</em>, if any. Can be a number (e.g. “Ann. of Math. 2nd series”) or the keys <code>newseries</code> or <code>oldseries</code> (e.g. “Selecta Math. New Series”).</>}
                />
              </BForm.Group>
              <BForm.Group as={Row}>
                <StandardInput
                  id='jvolume' name='volume'
                  label='Volume'
                  type='number'
                  help='The volume of the journal in which the article was published.'
                  totalColumns={6}
                />
                <StandardInput
                  id='jnumber' name='number'
                  label='Number'
                  type='number'
                  totalColumns={6}
                  help='Volumes are sometimes further subdivided in “issues” or something else: the number field refers to this subdivision.'
                />
              </BForm.Group>
            </div>

            {/* @book specific */}
            <div className={values.type !== 'Book' ? 'd-none' : null}>
              <BForm.Group as={Row}>
                <StandardInput
                  id='maintitle' name='maintitle'
                  label='Main title'
                  help='If the book is divided in several volumes that each have a different title, then “Main title” is the title of the whole work, and “Title” is the title of the individual volume. Do not use the subtitle in this situation as it will not render correctly (that would the be subtitle of the individual volume, if any).'
                  totalColumns={6}
                />
                <StandardInput
                  id='bvolume' name='volume'
                  label='Volume'
                  type='number'
                  help='When you want to quote a specific volume of a book.'
                  totalColumns={6}
                />
              </BForm.Group>

              <BForm.Group as={Row}>
                <StandardInput
                  id='bseries' name='series'
                  label='Book series'
                  help='The name of the series which contains the book (e.g. “Lecture Notes in Mathematics”).'
                  totalColumns={6}
                />
                <StandardInput
                  id='bnumber' name='number'
                  label='Number'
                  type='number'
                  help='The number of the book in the given series.'
                  totalColumns={6}
                />
              </BForm.Group>

              <BForm.Group as={Row}>
                <StandardInput
                  id='publisher' name='publisher'
                  label='Publisher'
                  totalColumns={6}
                />
                <StandardInput
                  id='location' name='location'
                  label='Location (of publisher)'
                  totalColumns={6}
                />
              </BForm.Group>

              <BForm.Group as={Row}>
                <StandardInput
                  id='isbn' name='ISBN'
                  label='ISBN'
                  totalColumns={6}
                />
                <StandardInput
                  id='pagetotal' name='pagetotal'
                  label='Number of pages'
                  type='number'
                  totalColumns={6}
                />
              </BForm.Group>
            </div>

            {/* general publication information */}
            <StandardGroup
              as='select'
              id='pubstate' name='pubstate'
              label='Publication state'
            >
              <option value=''>(leave blank)</option>
              <option value='inpreparation'>In preparation</option>
              <option value='prepublished'>Preprint</option>
              <option value='submitted'>Submitted</option>
              <option value='forthcoming'>Forthcoming (accepted by editor)</option>
              <option value='inpress'>In press (final stages, out of author's hands)</option>
            </StandardGroup>

            <StandardGroup
              id='id' name='id'
              label='ArXiv ID'
            />
            <StandardGroup
              id='doi' name='doi'
              label='DOI'
            />

            <BForm.Group>
              <Button
                type="reset"
                variant="secondary"
                block
              >
                <FontAwesomeIcon icon="trash-alt" /> Clear
              </Button>
            </BForm.Group>

            <FormattedEntry />
          </Form>
        }
      </Formik>
    </>
  );
}
