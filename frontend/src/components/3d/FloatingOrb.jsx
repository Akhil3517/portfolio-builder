import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingOrb = ({
  position = [0, 0, 0],
  color = '#60a5fa',
  size = 1.5,
  speed = 0.3,
  distort = 0.4,
}) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  const gradientColors = useMemo(() => ({
    color1: new THREE.Color(color),
    color2: new THREE.Color('#a78bfa'),
  }), [color]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * speed) * 0.3;
      meshRef.current.rotation.y = Math.cos(time * speed) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      
      const mouse = state.mouse;
      meshRef.current.rotation.x += mouse.y * 0.1;
      meshRef.current.rotation.y += mouse.x * 0.1;
    }

    if (materialRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2;
      materialRef.current.color.lerpColors(gradientColors.color1, gradientColors.color2, t);
    }
  });

  return (
    <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        attach="material"
        distort={distort}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={1}
      />
    </Sphere>
  );
};

export default FloatingOrb;
