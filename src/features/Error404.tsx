import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

/** A generic 404 error */
const Error404: React.FC<{}> = () => {
  return (
    <Jumbotron>
      <h1 className="text-center">404 not found</h1>
    </Jumbotron>
  );
};

export default Error404;
