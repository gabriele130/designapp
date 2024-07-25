import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Card } from 'react-bootstrap';
import { FaArrowsAltH, FaArrowsAltV, FaCube } from 'react-icons/fa';

const BoxSizeControl = ({ boxSize, setBoxSize }) => {
  const [width, setWidth] = useState(boxSize[0]);
  const [height, setHeight] = useState(boxSize[1]);
  const [depth, setDepth] = useState(boxSize[2]);

  useEffect(() => {
    setBoxSize([width, height, depth]);
  }, [width, height, depth, setBoxSize]);

  return (
    <Card className="position-fixed top-0 end-0 m-3 p-3 shadow" style={{ width: '18rem', zIndex: 1001 }}>
      <Card.Body>
        <Card.Title>Box Size</Card.Title>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text><FaArrowsAltH /></InputGroup.Text>
            <Form.Control
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              placeholder="Width"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text><FaArrowsAltV /></InputGroup.Text>
            <Form.Control
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Height"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text><FaCube /></InputGroup.Text>
            <Form.Control
              type="number"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              placeholder="Depth"
            />
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BoxSizeControl;
