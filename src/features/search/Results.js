import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert'

import {
  selectResults,
} from './resultsSlice';

export default function Results() {
  const results = useSelector(selectResults);

  return (
    <div>
      {
        results.map(s =>
          <Alert variant="dark" key={s}>
            <pre className="m-0">
              <code>
                {s}
              </code>
            </pre>
          </Alert>
        )
      }
    </div>
  );
}
