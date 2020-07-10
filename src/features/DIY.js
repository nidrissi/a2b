import React from 'react';

import { Formik, Form, Field, useFormikContext } from 'formik';

import Alert from 'react-bootstrap/Alert';
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

/** Standard input fields. More complex ones are done by hand. 
 */
function StandardInput({ id, label, children }) {
  return (
    <BForm.Group as={Row}>
      <BForm.Label
        column sm={2}
        htmlFor={id}
      >
        {label}
      </BForm.Label>
      <Col>
        {children}
      </Col>
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
            <StandardInput id='type' label='Type'>
              <Field
                id='type' name='type'
                as='select'
                className='form-control'
              >
                <option value='Article'>Journal article</option>
                <option value='Book'>Book</option>
                <option value='InProceedings'>Conference/Talk proceedings</option>
                <option value='Misc'>Other</option>
              </Field>
            </StandardInput>
            <StandardInput id='authors' label='Authors'>
              <Field
                id='authors' name='authors'
                className='form-control'
                placeholder='Author names separated by &'
              />
            </StandardInput>
            <StandardInput id='title' label='Title'>
              <Field
                id='title' name='title'
                className='form-control'
              />
            </StandardInput>
            <StandardInput id='year' label='Year'>
              <Field
                id='year' name='year'
                type='number'
                className='form-control'
              />
            </StandardInput>

            {/* @article-specific */}
            <div className={values.type !== 'Article' ? 'd-none' : null}>
              <BForm.Group as={Row}>
                <BForm.Label
                  column sm={2}
                  htmlFor='journal'
                >
                  Journal
                </BForm.Label>
                <Col sm={8}>
                  <Field
                    id='journal' name='journal'
                    className='form-control'
                  />
                </Col>
                <Col sm={2}>
                  <InputGroup>
                    <Field
                      id='jseries' name='series'
                      placeholder='Series ?'
                      className='form-control'
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <HelpTooltip>
                          The series of the <em>journal</em>, if any. Can be a number (e.g. “Ann. of Math. 2nd series”) or the keys <code>newseries</code> or <code>oldseries</code> (e.g. “Selecta Math. New Series”).
                        </HelpTooltip>
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </BForm.Group>
              <BForm.Group as={Row}>
                <BForm.Label
                  column sm={2}
                  htmlFor='jvolume'
                >
                  Volume
                  {' '}
                  <HelpTooltip>
                    The volume of the journal in which the article was published.
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='jvolume' name='volume'
                    type='number'
                    className='form-control'                  
                  />
                </Col>
                <BForm.Label
                  column sm={2}
                  htmlFor='jnumber'
                >
                  Number
                  {' '}
                  <HelpTooltip>
                    Volumes are sometimes further subdivided in “issues” or something else: the number field refers to this subdivision.
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='jnumber' name='number'
                    type='number'
                    className='form-control'
                  />
                </Col>
              </BForm.Group>
            </div>

            {/* @book specific */}
            <div className={values.type !== 'Book' ? 'd-none' : null}>
              <BForm.Group as={Row}>
                <BForm.Label
                  column sm={2}
                  htmlFor='maintitle'
                >
                  Main title
                  {' '}
                  <HelpTooltip>
                    If the book is divided in volumes that each have a different name, then “Main title” is the title of the whole book, and “Title” is the title of the volume.
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='maintitle' name='maintitle'
                    className='form-control'
                  />
                </Col>
                <BForm.Label
                  column sm={2}
                  htmlFor='bvolume'
                >
                  Volume number
                  {' '}
                  <HelpTooltip>
                    When you want to quote a specific volume of a book.
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='bvolume' name='volume'
                    type='number'
                    className='form-control'
                  />
                </Col>
              </BForm.Group>

              <BForm.Group as={Row}>
                <BForm.Label
                  column sm={2}
                  htmlFor='bseries'
                >
                  Book series
                  {' '}
                  <HelpTooltip>
                    The name of the series which contains the book (e.g. “Lecture Notes in Mathematics”).
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='bseries' name='series'
                    className='form-control'
                  />
                </Col>
                <BForm.Label
                  column sm={2}
                  htmlFor='bnumber'
                >
                  Number in series
                  {' '}
                  <HelpTooltip>
                    The number of the book in the series.
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='bnumber' name='number'
                    type='number'
                    className='form-control'
                  />
                </Col>
              </BForm.Group>
              <BForm.Group as={Row}>
                <BForm.Label
                  column sm={2}
                  htmlFor='publisher'
                >
                  Publisher
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='publisher' name='publisher'
                    className='form-control'
                  />
                </Col>
                <BForm.Label
                  column sm={2}
                  htmlFor='location'
                >
                  Location
                  {' '}
                  <HelpTooltip>
                    The location of the publisher.
                  </HelpTooltip>
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='location' name='location'
                    className='form-control'
                  />
                </Col>
              </BForm.Group>
              <BForm.Group as={Row}>
                <BForm.Label
                  column sm={2}
                  htmlFor='isbn'
                >
                  ISBN
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='isbn' name='ISBN'
                    className='form-control'
                  />
                </Col>
                <BForm.Label
                  column sm={2}
                  htmlFor='pagetotal'
                >
                  Number of pages
                </BForm.Label>
                <Col sm={4}>
                  <Field
                    id='pagetotal' name='pagetotal'
                    type='number'
                    className='form-control'
                  />
                </Col>
              </BForm.Group>
            </div>

            {/* general publication information */}
            <StandardInput id='pubstate' label='Publication state'>
              <Field
                id='pubstate' name='pubstate'
                as='select'
                className='form-control'
              >
                <option value=''>(leave blank)</option>
                <option value='inpreparation'>In preparation</option>
                <option value='prepublished'>Preprint</option>
                <option value='submitted'>Submitted</option>
                <option value='forthcoming'>Forthcoming (accepted by editor)</option>
                <option value='inpress'>In press (final stages, out of author's hands)</option>
              </Field>
            </StandardInput>

            <StandardInput id='id' label='ArXiv ID'>
              <Field
                id='id' name='id'
                className='form-control'
              />
            </StandardInput>
            <StandardInput id='doi' label='DOI'>
              <Field
                id='doi' name='doi'
                className='form-control'
              />
            </StandardInput>
            <FormattedEntry />
          </Form>
        }
      </Formik>
    </>
  );
}
