import React from 'react';
import { ButtonGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { FaArrowsAlt, FaSyncAlt, FaExpand, FaTrash, FaPalette, FaCouch, FaEye } from 'react-icons/fa';
import { ChromePicker } from 'react-color';

const products = [
  { name: 'Sedia', file: '/textures/Sedia.gltf' },
  { name: 'Sofa', file: '/textures/Sofa.gltf' },
  { name: 'Lampada', file: '/textures/Lampada.gltf' }
];

const Toolbar = ({ mode, setMode, loadProduct, color, onColorChange, toggleViewMode, viewMode }) => {
  return (
    <ButtonGroup className="toolbar">
      <Button variant={mode === 'translate' ? 'primary' : 'secondary'} onClick={() => setMode('translate')}>
        <FaArrowsAlt />
      </Button>
      <Button variant={mode === 'rotate' ? 'primary' : 'secondary'} onClick={() => setMode('rotate')}>
        <FaSyncAlt />
      </Button>
      <Button variant={mode === 'scale' ? 'primary' : 'secondary'} onClick={() => setMode('scale')}>
        <FaExpand />
      </Button>
      <Button variant={mode === 'delete' ? 'primary' : 'secondary'} onClick={() => setMode('delete')}>
        <FaTrash />
      </Button>
      <DropdownButton as={ButtonGroup} title={<FaCouch />} variant="secondary" id="bg-nested-dropdown">
        {products.map((product, index) => (
          <Dropdown.Item key={index} onClick={() => loadProduct(product.file)}>
            {product.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <DropdownButton as={ButtonGroup} title={<FaPalette />} variant="secondary" id="color-picker-dropdown">
        <Dropdown.Item as="div">
          <ChromePicker color={color} onChange={onColorChange} disableAlpha={true} />
        </Dropdown.Item>
      </DropdownButton>
      <Button variant={viewMode === '3D' ? 'primary' : 'secondary'} onClick={toggleViewMode}>
        <FaEye /> {viewMode === '3D' ? '2D' : '3D'}
      </Button>
    </ButtonGroup>
  );
};

export default Toolbar;
