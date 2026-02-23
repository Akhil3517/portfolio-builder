import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import Lights from './Lights';

const CanvasScene = ({
  children,
  className = '',
  cameraPosition = [0, 0, 5],
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Lights />
          {children}
          <Environment preset="night" />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
};

export default CanvasScene;
