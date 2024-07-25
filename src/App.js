import { Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { OrbitControls, Sky, TransformControls, Grid, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { OrthographicCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Room from './components/Room';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import BoxSizeControl from './components/BoxSizeControl';
import ToggleButton from './components/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [mode, setMode] = useState('translate');
  const [selectedObject, setSelectedObject] = useState(null);
  const [wallSize, setWallSize] = useState([10, 5, 10]);
  const [floorTexture, setFloorTexture] = useState('floor1.jpg');
  const [wallTexture, setWallTexture] = useState('wall1.jpg');
  const [doorTexture, setDoorTexture] = useState('doorTexture.jpg');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([{ position: [0, 0, 0], doors: [], windows: [], objects: [] }]);
  const [color, setColor] = useState('#ffffff');
  const [viewMode, setViewMode] = useState('3D');

  const addDoor = (roomIndex) => {
    const newDoor = { id: THREE.MathUtils.generateUUID(), position: [0, 1, 0], size: [1, 2, 0.1], name: 'door' };
    const newRooms = [...rooms];
    newRooms[roomIndex].doors.push(newDoor);
    setRooms(newRooms);
  };

  const addWindow = (roomIndex) => {
    const newWindow = { id: THREE.MathUtils.generateUUID(), position: [2, 2, 0], size: [1.5, 1.5, 0.1], name: 'window' };
    const newRooms = [...rooms];
    newRooms[roomIndex].windows.push(newWindow);
    setRooms(newRooms);
  };

  const addRoom = () => {
    const newRoom = { position: [rooms.length * 12, 0, 0], doors: [], windows: [], objects: [] };
    setRooms([...rooms, newRoom]);
  };

  const removeObject = () => {
    if (selectedObject) {
      const newRooms = rooms.map((room) => ({
        ...room,
        doors: room.doors.filter((door) => door.id !== selectedObject.uuid),
        windows: room.windows.filter((window) => window.id !== selectedObject.uuid),
        objects: room.objects.filter((object) => object.id !== selectedObject.uuid),
      }));
      setRooms(newRooms);
      setSelectedObject(null);
    }
  };

  const handleObjectClick = (e) => {
    if (mode === 'delete') {
      setSelectedObject(e.object);
    } else {
      setSelectedObject(e.object);
    }
    e.stopPropagation();
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    if (selectedObject) {
      selectedObject.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color.hex);
        }
      });
    }
  };

  const loadProduct = (file) => {
    const loader = new GLTFLoader();
    loader.load(file, (gltf) => {
      const scene = gltf.scene;

      scene.traverse((child) => {
        if (child.isMesh) {
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color('skyblue') });
          } else {
            child.material.color.set('skyblue');
          }
        }
      });

      add3DObjectToRoom(scene);
    });
  };

  const add3DObjectToRoom = (object) => {
    object.uuid = THREE.MathUtils.generateUUID();
    const newObject = { id: object.uuid, object };
    const newRooms = [...rooms];
    newRooms[newRooms.length - 1].objects.push(newObject);
    setRooms(newRooms);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === '3D' ? '2D' : '3D'));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ToggleButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <Sidebar
          setFloorTexture={setFloorTexture}
          setWallTexture={setWallTexture}
          setDoorTexture={setDoorTexture}
          addDoor={() => addDoor(rooms.length - 1)}
          addWindow={() => addWindow(rooms.length - 1)}
          addRoom={addRoom}
        />
      )}
      <Toolbar
        mode={mode}
        setMode={setMode}
        loadProduct={loadProduct}
        color={color}
        onColorChange={handleColorChange}
        toggleViewMode={toggleViewMode}
        viewMode={viewMode}
      />
      <BoxSizeControl boxSize={wallSize} setBoxSize={setWallSize} />
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        onPointerMissed={() => setSelectedObject(null)}
        orthographic={viewMode === '2D'}
        camera={viewMode === '2D' ? { zoom: 20, position: [0, 20, 0], up: [0, 0, -1] } : { position: [0, wallSize[1] * 2, wallSize[2] * 2], fov: 50 }}
      >
        <Scene
          mode={mode}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          wallSize={wallSize}
          floorTexture={floorTexture}
          wallTexture={wallTexture}
          doorTexture={doorTexture}
          rooms={rooms}
          handleObjectClick={handleObjectClick}
          viewMode={viewMode}
        />
      </Canvas>
      {mode === 'delete' && selectedObject && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white p-2 rounded" style={{ zIndex: 1002 }}>
          <Button variant="danger" onClick={removeObject}>
            Confirm Delete
          </Button>
        </div>
      )}
    </div>
  );
};

const Scene = ({ mode, selectedObject, setSelectedObject, wallSize, floorTexture, wallTexture, doorTexture, rooms, handleObjectClick, viewMode }) => {
  const orbitControlsRef = useRef();
  const transformControlsRef = useRef();
  const wallRefs = useRef([]);

  const skyTexture = useLoader(THREE.TextureLoader, '/textures/sky_with_planets.jpg');

  useEffect(() => {
    skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
    skyTexture.anisotropy = 16;
    skyTexture.minFilter = THREE.LinearFilter;
    skyTexture.magFilter = THREE.LinearFilter;

    if (orbitControlsRef.current) {
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.update();
    }
  }, [skyTexture]);

  useFrame(() => {
    if (transformControlsRef.current) {
      const controls = transformControlsRef.current;
      const { dragging } = controls;
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = !dragging;
      }
    }

    if (orbitControlsRef.current) {
      const cameraPosition = orbitControlsRef.current.object.position;

      wallRefs.current.forEach((wallGroup) => {
        const [leftWallRef, rightWallRef, backWallRef, frontWallRef] = wallGroup;
        if (leftWallRef?.current && rightWallRef?.current && backWallRef?.current && frontWallRef?.current) {
          if (cameraPosition.x > 0) {
            leftWallRef.current.material.opacity = 1;
            rightWallRef.current.material.opacity = 0.3;
          } else {
            leftWallRef.current.material.opacity = 0.3;
            rightWallRef.current.material.opacity = 1;
          }

          if (cameraPosition.z > 0) {
            backWallRef.current.material.opacity = 1;
            frontWallRef.current.material.opacity = 0.3;
          } else {
            backWallRef.current.material.opacity = 0.3;
            frontWallRef.current.material.opacity = 1;
          }

          [leftWallRef, rightWallRef, backWallRef, frontWallRef].forEach((ref) => {
            if (ref.current) {
              ref.current.material.transparent = true;
            }
          });
        }
      });
    }
  });

  useEffect(() => {
    if (selectedObject && mode !== 'delete') {
      selectedObject.material.opacity = 1;
      selectedObject.material.transparent = false;
    }
  }, [selectedObject, mode]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 10, -5]} intensity={0.5} />
      {viewMode === '3D' && <Sky sunPosition={[100, 20, 100]} />}
      {viewMode === '3D' && <Grid args={[100, 100]} position={[0, -0.51, 0]} />}
      {viewMode === '3D' && <ContactShadows position={[0, -0.5, 0]} opacity={0.5} width={10} height={10} blur={2.5} far={10} />}
      {viewMode === '3D' && <Environment preset="sunset" />}
      {viewMode === '3D' && (
        <mesh position={[0, 50, 0]}>
          <sphereGeometry args={[100, 64, 64]} />
          <meshStandardMaterial map={skyTexture} side={THREE.BackSide} />
        </mesh>
      )}
      {rooms.map((room, index) => (
        <Room
          key={index}
          position={room.position}
          onSelect={setSelectedObject}
          wallSize={wallSize}
          floorTexture={floorTexture}
          wallTexture={wallTexture}
          doorTexture={doorTexture}
          doors={room.doors}
          windows={room.windows}
          objects={room.objects}
          wallRefs={(refs) => (wallRefs.current[index] = refs)}
          handleClick={handleObjectClick}
          viewMode={viewMode}
        />
      ))}
      {selectedObject && mode !== 'delete' && viewMode === '3D' && <TransformControls ref={transformControlsRef} object={selectedObject} mode={mode} />}
      {viewMode === '3D' && <OrbitControls ref={orbitControlsRef} />}
    </>
  );
};

export default App;
