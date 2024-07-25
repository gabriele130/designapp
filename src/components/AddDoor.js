import React from 'react';
import { Button } from 'react-bootstrap';

const AddDoor = ({ addDoor }) => {
  return (
    <Button
      onClick={addDoor}
      style={{ marginBottom: '10px' }}
      className="btn btn-primary"
    >
      Add Door
    </Button>
  );
};

export default AddDoor;