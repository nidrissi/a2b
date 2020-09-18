import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import {
  saveSettings,
  selectMode, setMode,
  selectIncludeAbstract, setIncludeAbstract,
  selectIncludeFile, setIncludeFile,
  selectFilePrefix, setFilePrefix,
  selectIncludePrimaryCategory, setIncludePrimaryCategory,
  selectIncludeVersion, setIncludeVersion,
  selectMaxResults, setMaxResults,
  selectSortBy, setSortBy,
  selectSortOrder, setSortOrder,
} from './settingsSlice';

/** The settings form, controls the related redux state. */
export default function Settings() {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const includeAbstract = useSelector(selectIncludeAbstract);
  const includeFile = useSelector(selectIncludeFile);
  const filePrefix = useSelector(selectFilePrefix);
  const includePrimaryCategory = useSelector(selectIncludePrimaryCategory);
  const includeVersion = useSelector(selectIncludeVersion);

  const maxResults = useSelector(selectMaxResults);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  return (
    <div>
      <h1>Settings</h1>
      <Form onChange={() => dispatch(saveSettings())}>
        <h3>Entry display</h3>
        <Form.Group>
          <Form.Control
            as="select"
            value={mode}
            onChange={e => dispatch(setMode(e.target.value))}
          >
            <option value="biblatex">BibLaTeX (recommended)</option>
            <option value="bibtex">Legacy BibTeX (⚠ see help)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            checked={includeFile}
            onChange={e => dispatch(setIncludeFile(e.target.checked))}
            id='includeFile'
            label='Include file field in entries'
          />
        </Form.Group>
        <Form.Group className="ml-3">
          <Form.Check
            checked={filePrefix}
            onChange={e => dispatch(setFilePrefix(e.target.checked))}
            id='filePrefix'
            disabled={!includeFile}
            label={<span>Add a prefix to the file field (<code>Doe2020.pdf</code> ⇒ <code>D/Doe2020.pdf</code>)</span>}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            checked={includeAbstract}
            onChange={e => dispatch(setIncludeAbstract(e.target.checked))}
            id='includeAbstract'
            label='Include the abstract'
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            checked={includePrimaryCategory}
            onChange={e => dispatch(setIncludePrimaryCategory(e.target.checked))}
            id='includePrimaryCategory'
            label={<span>Include the primary category (e.g. <code>math.AT</code>), if any</span>}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            checked={includeVersion}
            onChange={e => dispatch(setIncludeVersion(e.target.checked))}
            id='includeVersion'
            label='Include version information'
          />
        </Form.Group>
        <h3>Search settings</h3>
        <Form.Group>
          <Form.Label>Sort by</Form.Label>
          <Form.Control
            as="select"
            id="sortBy"
            value={sortBy}
            onChange={e => dispatch(setSortBy(e.target.value))}
          >
            <option value="submittedDate">Initial submission date</option>
            <option value="lastUpdatedDate">Last update</option>
            <option value="relevance">Relevance</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sort order</Form.Label>
          <Form.Control
            as="select"
            id="sortOrder"
            value={sortOrder}
            onChange={e => dispatch(setSortOrder(e.target.value))}
          >
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Max results</Form.Label>
          <Form.Control
            as="select"
            id="maxResults"
            value={maxResults}
            onChange={e => dispatch(setMaxResults(e.target.value))}
          >
            {[10, 20, 50, 100, 200, 500, 1000].map(i => <option key={i} value={i}>{i}</option>)}
          </Form.Control>
        </Form.Group>
      </Form>
      <p className="text-muted">
        Settings are automatically saved in your browser's <a href="https://en.wikipedia.org/wiki/Web_storage">local storage</a> (you may need to enable some permissions).
      </p>
    </div>
  );
}
