import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  selectIncludeFile, setIncludeFile,
} from './settingsSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const includeFile = useSelector(selectIncludeFile);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Check
            checked={includeFile}
            onChange={e => dispatch(setIncludeFile(e.target.checked))}
            id='IncludeFile'
            label='Include file field in entries'
          />
        </Form.Group>
      </Form>
    </div>
  );
}
