import React from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import AddDoor from './AddDoor';
import AddWindow from './AddWindow';
import AddRoom from './AddRoom';

const Sidebar = ({ setFloorTexture, setWallTexture, addDoor, addWindow, addRoom, setDoorTexture }) => {
  return (
    <div className="d-flex flex-column vh-100 bg-light border-end position-fixed" style={{ width: '250px', zIndex: 1001, paddingTop: '60px' }}>
      <ListGroup variant="flush">
        <Dropdown className="mb-3" style={{ paddingTop: '20px' }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Change Floor Texture
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFloorTexture('floor1.jpg')}>Floor Texture 1</Dropdown.Item>
            <Dropdown.Item onClick={() => setFloorTexture('floor2.jpg')}>Floor Texture 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mb-3" style={{ paddingTop: '20px' }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Change Wall Texture
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setWallTexture('wall1.jpg')}>Wall Texture 1</Dropdown.Item>
            <Dropdown.Item onClick={() => setWallTexture('wall2.jpg')}>Wall Texture 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mb-3" style={{ paddingTop: '20px' }}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Change Door Texture
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setDoorTexture('doorTexture.jpg')}>Door Texture 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <AddDoor addDoor={addDoor} />
        <AddWindow addWindow={addWindow} />
        <AddRoom addRoom={addRoom} />
      </ListGroup>
    </div>
  );
};

export default Sidebar;
