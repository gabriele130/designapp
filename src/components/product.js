import React from 'react';

const Product = ({ position, size, color, onSelect }) => {
  return (
    <mesh position={position} onPointerDown={onSelect}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Product;
