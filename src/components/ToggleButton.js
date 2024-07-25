import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({ onClick, isSidebarOpen }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 10,
        left: 10,
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '0.25rem',
        zIndex: 1002,
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background 0.3s ease',
      }}
      className="btn btn-primary"
    >
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );
};

export default ToggleButton;
