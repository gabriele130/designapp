import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Room = ({ position, wallSize, floorTexture, wallTexture, doorTexture, doors, windows, objects, wallRefs, handleClick, viewMode }) => {
  const floorTex = useLoader(THREE.TextureLoader, `/textures/${floorTexture}`);
  const wallTex = useLoader(THREE.TextureLoader, `/textures/${wallTexture}`);
  const doorTex = useLoader(THREE.TextureLoader, `/textures/${doorTexture}`);

  const leftWallRef = useRef();
  const rightWallRef = useRef();
  const backWallRef = useRef();
  const frontWallRef = useRef();

  useEffect(() => {
    if (wallRefs) {
      wallRefs([leftWallRef, rightWallRef, backWallRef, frontWallRef]);
    }
  }, [wallRefs]);

  const floorThickness = 0.1;
  const wallThickness = 0.1;
  const floorSize = [wallSize[0], floorThickness, wallSize[2]];

  return (
    <group position={position}>
      <mesh name="floor" position={[0, -floorThickness / 2, 0]} onClick={handleClick} receiveShadow>
        <boxGeometry args={floorSize} />
        <meshStandardMaterial map={floorTex} />
      </mesh>
      <mesh name="wall" ref={leftWallRef} position={[-wallSize[0] / 2, wallSize[1] / 2, 0]} onClick={handleClick} castShadow>
        <boxGeometry args={[wallThickness, wallSize[1], wallSize[2]]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>
      <mesh name="wall" ref={rightWallRef} position={[wallSize[0] / 2, wallSize[1] / 2, 0]} onClick={handleClick} castShadow>
        <boxGeometry args={[wallThickness, wallSize[1], wallSize[2]]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>
      <mesh name="wall" ref={backWallRef} position={[0, wallSize[1] / 2, -wallSize[2] / 2]} onClick={handleClick} castShadow>
        <boxGeometry args={[wallSize[0], wallSize[1], wallThickness]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>
      <mesh name="wall" ref={frontWallRef} position={[0, wallSize[1] / 2, wallSize[2] / 2]} onClick={handleClick} castShadow>
        <boxGeometry args={[wallSize[0], wallSize[1], wallThickness]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>
      {doors.map((door) => (
        <mesh key={door.id} name="door" position={door.position} onClick={handleClick} castShadow>
          <boxGeometry args={door.size} />
          <meshStandardMaterial map={doorTex} />
        </mesh>
      ))}
      {windows.map((window) => (
        <mesh key={window.id} name="window" position={window.position} onClick={handleClick} castShadow>
          <boxGeometry args={window.size} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
      ))}
      {objects.map((obj) => (
        <primitive key={obj.id} object={obj.object} onClick={handleClick} />
      ))}
    </group>
  );
};

export default Room;
