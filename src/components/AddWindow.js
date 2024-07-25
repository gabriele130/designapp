import React from 'react';
import { Button } from 'react-bootstrap';

const AddWindow = ({ addWindow }) => {
  return (
    <Button
      onClick={addWindow}
      style={{ marginBottom: '10px' }}
      className="btn btn-primary"
    >
      Add Window
    </Button>
  );
};

export default AddWindow;