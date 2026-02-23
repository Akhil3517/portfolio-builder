import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Lights = ({ intensity = 1, followMouse = true }) => {
  const mainLightRef = useRef(null);
  const accentLightRef = useRef(null);

  useFrame((state) => {
    if (followMouse && mainLightRef.current) {
      mainLightRef.current.position.x = state.mouse.x * 3;
      mainLightRef.current.position.y = state.mouse.y * 3 + 2;
    }

    if (accentLightRef.current) {
      const time = state.clock.elapsedTime;
      accentLightRef.current.position.x = Math.sin(time * 0.5) * 4;
      accentLightRef.current.position.z = Math.cos(time * 0.5) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15 * intensity} />

      <pointLight
        ref={mainLightRef}
        position={[0, 2, 4]}
        intensity={2 * intensity}
        color="#60a5fa"
        distance={20}
        decay={2}
      />

      <pointLight
        ref={accentLightRef}
        position={[4, 0, 0]}
        intensity={1.5 * intensity}
        color="#a78bfa"
        distance={15}
        decay={2}
      />

      <pointLight
        position={[-3, 2, -4]}
        intensity={0.8 * intensity}
        color="#f97316"
        distance={12}
        decay={2}
      />

      <hemisphereLight
        color="#60a5fa"
        groundColor="#1e1b4b"
        intensity={0.3 * intensity}
      />
    </>
  );
};

export default Lights;
