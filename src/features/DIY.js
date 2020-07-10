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

/** Standard input fields. More complex ones are done by hand. 
 */
function StandardInput({ as, id, name, label, placeholder, children }) {
  return (
    <BForm.Group as={Row}>
      <BForm.Label
        column sm={2}
        htmlFor={id}
      >
        {label}
      </BForm.Label>
      <Col>
        <Field
          {...{as, id, name, placeholder, children}}
          className='form-control'
        />
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
            <StandardInput as='select' id='type' name='type' label='Type'>
              <option value='Article'>Journal article</option>
              <option value='Book'>Book</option>
              <option value='InProceedings'>Conference/Talk proceedings</option>
              <option value='Misc'>Other</option>
            </StandardInput>
            <StandardInput
              id='authors' name='authors'
              label='Authors'
              placeholder='Author names separated by &'
            />
            <StandardInput
              id='title' name='title'
              label='Title'
            />
            <StandardInput
              id='year' name='year'
              label='Year'
            />

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
                    If the book is divided in several volumes that each have a different title, then “Main title” is the title of the whole work, and “Title” is the title of the individual volume. Do not use the subtitle in this situation as it will not render correctly (that would the be subtitle of the individual volume, if any).
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
            <StandardInput
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
            </StandardInput>

            <StandardInput
              id='id' name='id'
              label='ArXiv ID'
            />
            <StandardInput
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
