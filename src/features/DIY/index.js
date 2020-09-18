import React from 'react';

import { Formik, Form, useFormikContext } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import BForm from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Entry from '../Entry';
import { StandardInput, StandardGroup } from './standard';

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

/** The body of the `DIY` component.
 * @param values The values provided by Formik.
 */
function diyBody({ values }) {
  return (
    <>
      <Form>
        {/* common important fields */}
        <StandardGroup as='select' name='type' label='Type'>
          <option value='Article'>Journal article</option>
          <option value='Book'>Book</option>
          <option value='InProceedings'>Conference/Talk proceedings</option>
          <option value='Misc'>Other</option>
        </StandardGroup>
        <StandardGroup
          name='authors'
          label='Authors'
          placeholder='Author names separated by &'
        />
        <StandardGroup
          name='title'
          label='Title'
        />
        <StandardGroup
          name='year'
          label='Year'
        />

        { /* @article-specific */
          values.type === 'Article' &&
            <>
              <BForm.Group as={Row}>
                <StandardInput
                  name='journal'
                  label='Journal'
                  totalColumns={6}
                />
                <StandardInput
                  name='series'
                  label='Series'
                  totalColumns={6}
                  help={<>The series of the <em>journal</em>, if any. Can be a number (e.g. “Ann. of Math. 2nd series”) or the keys <code>newseries</code> or <code>oldseries</code> (e.g. “Selecta Math. New Series”).</>}
                />
              </BForm.Group>
              <BForm.Group as={Row}>
                <StandardInput
                  name='volume'
                  label='Volume'
                  type='number'
                  help='The volume of the journal in which the article was published.'
                  totalColumns={6}
                />
                <StandardInput
                  name='number'
                  label='Number'
                  type='number'
                  totalColumns={6}
                  help='Volumes are sometimes further subdivided in “issues” or something else: the number field refers to this subdivision.'
                />
              </BForm.Group>
            </>
        }

        { /* @book specific */
          values.type === 'Book' &&
            <>
              <BForm.Group as={Row}>
                <StandardInput
                  name='maintitle'
                  label='Main title'
                  help='If the book is divided in several volumes that each have a different title, then “Main title” is the title of the whole work, and “Title” is the title of the individual volume. Do not use the subtitle in this situation as it will not render correctly (that would the be subtitle of the individual volume, if any).'
                  totalColumns={6}
                />
                <StandardInput
                  name='volume'
                  label='Volume'
                  type='number'
                  help='When you want to quote a specific volume of a book.'
                  totalColumns={6}
                />
              </BForm.Group>

              <BForm.Group as={Row}>
                <StandardInput
                  name='series'
                  label='Book series'
                  help='The name of the series which contains the book (e.g. “Lecture Notes in Mathematics”).'
                  totalColumns={6}
                />
                <StandardInput
                  name='number'
                  label='Number'
                  type='number'
                  help='The number of the book in the given series.'
                  totalColumns={6}
                />
              </BForm.Group>

              <BForm.Group as={Row}>
                <StandardInput
                  name='publisher'
                  label='Publisher'
                  totalColumns={6}
                />
                <StandardInput
                  name='location'
                  label='Location (of publisher)'
                  totalColumns={6}
                />
              </BForm.Group>

              <BForm.Group as={Row}>
                <StandardInput
                  name='ISBN'
                  label='ISBN'
                  totalColumns={6}
                />
                <StandardInput
                  name='pageTotal'
                  label='Number of pages'
                  type='number'
                  totalColumns={6}
                />
              </BForm.Group>
            </>
        }

        {/* general publication information */}
        <StandardGroup
          as='select'
          name='pubstate'
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
          name='id'
          label='ArXiv ID'
        />
        <StandardGroup
          name='doi'
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
      </Form>

      <FormattedEntry />
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
