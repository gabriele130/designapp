import React from 'react';
import { Button } from 'react-bootstrap';

const AddRoom = ({ addRoom }) => {
  return (
    <Button
      onClick={addRoom}
      style={{ marginBottom: '10px' }}
      className="btn btn-primary"
    >
      Add Room
    </Button>
  );
};

export default AddRoom;