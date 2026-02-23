import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const AbstractGeometry = ({
  position = [0, 0, 0],
  scale = 1,
  type = 'icosahedron',
}) => {
  const meshRef = useRef(null);
  const wireframeRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      
      meshRef.current.rotation.x += state.mouse.y * 0.2;
      meshRef.current.rotation.y += state.mouse.x * 0.2;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current?.rotation.x || 0;
      wireframeRef.current.rotation.y = meshRef.current?.rotation.y || 0;
    }
  });

  const geometry = useMemo(() => {
    switch (type) {
      case 'torus':
        return new THREE.TorusGeometry(1, 0.4, 16, 100);
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0);
      default:
        return new THREE.IcosahedronGeometry(1, 1);
    }
  }, [type]);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} scale={scale}>
        <mesh ref={meshRef} geometry={geometry}>
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={256}
            transmission={0.95}
            roughness={0.05}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.2}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#60a5fa"
            color="#60a5fa"
          />
        </mesh>

        <lineSegments ref={wireframeRef} geometry={edges}>
          <lineBasicMaterial color="#60a5fa" transparent opacity={0.3} />
        </lineSegments>
      </group>
    </Float>
  );
};

export default AbstractGeometry;
