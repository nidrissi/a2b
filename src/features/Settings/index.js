import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import {
  saveSettings,
  selectIncludeFile, setIncludeFile,
  selectMaxResults, setMaxResults,
  selectSortBy, setSortBy,
  selectSortOrder, setSortOrder,
} from './settingsSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const includeFile = useSelector(selectIncludeFile);
  const maxResults = useSelector(selectMaxResults);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  return (
    <div>
      <h1>Settings</h1>
      <Form onChange={() => dispatch(saveSettings())}>
        <h3>Entry display</h3>
        <Form.Group>
          <Form.Check
            checked={includeFile}
            onChange={e => dispatch(setIncludeFile(e.target.checked))}
            id='includeFile'
            label='Include file field in entries'
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
            {[10, 20, 50, 100].map(i => <option key={i} value={i}>{i}</option>)}
          </Form.Control>
        </Form.Group>
      </Form>
      <p>
        Settings are automatically saved in your browser's <a href="https://en.wikipedia.org/wiki/Web_storage">local storage</a> (you may need to enable some permissions).
      </p>
    </div>
  );
}
