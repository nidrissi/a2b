import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import BForm from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** The submit and clear buttons used in SearchForm.
    @param isLoading Whether the form is currently loading or not.
 */
export const SubmitAndClearButtons: React.FC<{ isLoading: boolean; }> = ({ isLoading }) => {
  return (
    <BForm.Group as={BForm.Row}>
      <Col sm={10}>
        <Button
          disabled={isLoading}
          type="submit"
          block
        >
          {isLoading ?
            <span><Spinner animation="border" size="sm" /> Loading...</span>
            : <span><FontAwesomeIcon icon="search" /> Search</span>}
        </Button>
      </Col>
      <Col>
        <Button
          type="reset"
          variant="secondary"
          block
        >
          <FontAwesomeIcon icon="trash-alt" /> Clear
        </Button>
      </Col>
    </BForm.Group>
  );
};
