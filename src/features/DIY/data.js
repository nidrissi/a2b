import React from 'react';

import BForm from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { StandardInput, StandardGroup } from './standard';

/** Generic fields, to be displayed _before_ type-specific fields. */
export function GenericPreFields() {
  return (
    <>
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
      <StandardGroup
        name='subTitle'
        label='Subtitle'
      />
    </>
  );
}

/** Generic fields, to be displayed _after_ type-specific fields. */
export function GenericPostFields() {
  return (
    <>
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
    </>
  );
}

/** Article-specific fields */
function ArticleFields() {
  return (
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
          help={<>The series of the <em>journal</em>, if any. It can be a number (to get e.g. “Ann. of Math. 2nd series”) or one of the keys <code>newseries</code> or <code>oldseries</code> (to get e.g. “Selecta Math. New Series”).</>}
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
          help='Volumes are sometimes further subdivided in “issues” or something else. This number field refers to this subdivision.'
        />
      </BForm.Group>
    </>
  )
}

/** Book-specific fields. */
function BookFields() {
  return (
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
  );
}

/** Type-specific fields, e.g. article fields, book fields...
 * @param type The type such as 'Article' or 'Book'
 */
export function SpecificFields({ type }) {
  if (type === 'Article') {
    return <ArticleFields />;
  } else if (type === 'Book') {
    return <BookFields />;
  } else {
    return null;
  }
}
