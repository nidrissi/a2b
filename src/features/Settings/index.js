import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';

import {
  saveSettings,
  selectIncludeFile, setIncludeFile,
} from './settingsSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const includeFile = useSelector(selectIncludeFile);

  return (
    <div>
      <p className="lead">
        Settings are automatically saved in your browser's <a href="https://en.wikipedia.org/wiki/Web_storage">local storage</a> (you may need to enable some permissions).
      </p>
      <Form onChange={() => dispatch(saveSettings())}>
        <Form.Group>
          <Form.Check
            checked={includeFile}
            onChange={e => dispatch(setIncludeFile(e.target.checked))}
            id='includeFile'
            label='Include file field in entries'
          />
        </Form.Group>
      </Form>
    </div>
  );
}
