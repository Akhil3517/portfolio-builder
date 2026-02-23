import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_TILT_DEG = 3;
const MAX_TILT_RAD = (MAX_TILT_DEG * Math.PI) / 180;

function CameraRig({ scrollProgress, pointerNorm }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const px = pointerNorm?.x ?? 0;
    const py = pointerNorm?.y ?? 0;
    const tiltScale = 0.12;
    mouse.current.x += (THREE.MathUtils.clamp(px * tiltScale, -MAX_TILT_RAD, MAX_TILT_RAD) - mouse.current.x) * 0.05;
    mouse.current.y += (THREE.MathUtils.clamp(py * tiltScale, -MAX_TILT_RAD, MAX_TILT_RAD) - mouse.current.y) * 0.05;

    const baseZ = 6;
    const targetZ = 2.5;
    const baseY = 2;
    const targetY = 1.2;
    const z = THREE.MathUtils.lerp(baseZ, targetZ, scrollProgress);
    const y = THREE.MathUtils.lerp(baseY, targetY, scrollProgress);

    const dist = z;
    const offsetX = mouse.current.x * dist * 0.5;
    const offsetY = mouse.current.y * dist * 0.5;
    camera.position.set(offsetX, y + offsetY, z);
    camera.lookAt(0, 0.8, 0);
  });

  return null;
}

function Desk() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]} receiveShadow>
        <boxGeometry args={[3, 0.08, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>
      {[[-1.3, 0, -0.6], [1.3, 0, -0.6], [-1.3, 0, 0.6], [1.3, 0, 0.6]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.25, pos[2]]}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
          <meshStandardMaterial color="#111" roughness={0.5} metalness={0.9} />
        </mesh>
      ))}
      {/* Soft shadow under desk */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.6} depthWrite={false} />
      </mesh>
    </group>
  );
}

const CODE_LINES = [
  "const Portfolio = () => {",
  "  return (",
  "    <Canvas>",
  "      <Scene />",
  "    </Canvas>",
  "};",
  "export default Portfolio;",
];

function LaptopScreenCode() {
  const canvasRef = useRef(null);
  const textureRef = useRef(null);
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const blinkRef = useRef(true);
  const lastUpdate = useRef(0);

  const texture = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 320;
    canvasRef.current = c;
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    textureRef.current = tex;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    const canvas = canvasRef.current;
    const tex = textureRef.current;
    if (!canvas || !tex) return;
    const now = clock.elapsedTime;
    if (now - lastUpdate.current < 0.08) return;
    lastUpdate.current = now;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const lineHeight = 22;
    const fontSize = 14;
    const padding = 20;
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = '#58a6ff';
    ctx.fillText('portfolio.jsx', padding, 28);
    ctx.strokeStyle = 'rgba(88, 166, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, 34, 120, 1);

    ctx.font = `${fontSize}px monospace`;
    let y = 34 + lineHeight * 2;
    for (let i = 0; i < CODE_LINES.length; i++) {
      const line = CODE_LINES[i];
      const isActiveLine = i === lineIndex.current;
      const drawUpTo = isActiveLine ? charIndex.current : line.length;
      ctx.fillStyle = '#8b949e';
      ctx.fillText(line.substring(0, drawUpTo), padding, y);
      if (isActiveLine && drawUpTo < line.length) {
        ctx.fillStyle = '#7ee787';
        ctx.fillText(line.substring(drawUpTo, drawUpTo + 1), padding + ctx.measureText(line.substring(0, drawUpTo)).width, y);
      }
      if (isActiveLine && drawUpTo >= line.length) {
        if (blinkRef.current) {
          ctx.fillStyle = '#7ee787';
          ctx.fillText('|', padding + ctx.measureText(line).width, y);
        }
      }
      y += lineHeight;
    }

    const atEnd = lineIndex.current >= CODE_LINES.length - 1 && charIndex.current >= CODE_LINES[CODE_LINES.length - 1].length;
    if (atEnd) {
      blinkRef.current = Math.floor(now * 2) % 2 === 0;
      if (now % 5 < 0.08) {
        lineIndex.current = 0;
        charIndex.current = 0;
      }
    } else {
      blinkRef.current = true;
      charIndex.current++;
      if (charIndex.current > CODE_LINES[lineIndex.current].length) {
        charIndex.current = 0;
        lineIndex.current = Math.min(lineIndex.current + 1, CODE_LINES.length - 1);
      }
    }

    tex.needsUpdate = true;
  });

  return (
    <mesh position={[0, 0, 0.016]}>
      <planeGeometry args={[0.75, 0.45]} />
      <meshBasicMaterial map={texture} transparent={false} />
    </mesh>
  );
}

function Laptop() {
  const glowRef = useRef(null);
  const glowPhase = useRef(0);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowPhase.current += 0.02;
      if (glowPhase.current > Math.PI * 2) glowPhase.current -= Math.PI * 2;
      glowRef.current.intensity = 1.8 + Math.sin(glowPhase.current) * 0.25;
    }
  });

  return (
    <group position={[0, 0.58, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.03, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.9} />
      </mesh>
      <group position={[0, 0.35, -0.27]} rotation={[-0.3, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.85, 0.55, 0.02]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
        </mesh>
        <LaptopScreenCode />
      </group>
      <pointLight
        ref={glowRef}
        position={[0, 0.6, 0.2]}
        color="#4fc3f7"
        intensity={1.8}
        distance={4}
        decay={2}
      />
    </group>
  );
}

function Developer() {
  const groupRef = useRef(null);
  const headRef = useRef(null);
  const phase = useRef(0);

  useFrame(({ clock }) => {
    phase.current += 0.016;
    if (phase.current > Math.PI * 2) phase.current -= Math.PI * 2;
    if (groupRef.current) {
      const t = clock.elapsedTime;
      groupRef.current.position.y = 0.54 + Math.sin(t * 0.8) * 0.008;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.02;
    }
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(phase.current * 0.5) * 0.04;
      headRef.current.rotation.z = Math.sin(phase.current * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.54, 0.3]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.4, 0.45, 0.25]} />
        <meshStandardMaterial color="#1e1e2e" roughness={0.7} />
      </mesh>
      <group ref={headRef} position={[0, 0.72, 0]}>
        <mesh>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#2d2d3d" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.02, 0.12]}>
          <boxGeometry args={[0.2, 0.04, 0.02]} />
          <meshBasicMaterial color="#4fc3f7" transparent opacity={0.5} />
        </mesh>
      </group>
      <mesh position={[-0.28, 0.15, -0.1]} rotation={[0.4, 0, -0.3]}>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial color="#1e1e2e" roughness={0.7} />
      </mesh>
      <mesh position={[0.28, 0.15, -0.1]} rotation={[0.4, 0, 0.3]}>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial color="#1e1e2e" roughness={0.7} />
      </mesh>
    </group>
  );
}

function AmbientDust() {
  const count = 12;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = Math.random() * 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  const ref = useRef(null);
  const rotY = useRef(0);

  useFrame((_, delta) => {
    if (ref.current) {
      rotY.current += delta * 0.1;
      ref.current.rotation.y = rotY.current;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#4fc3f7" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

const DeveloperScene = ({ name, role, scrollProgress, pointerNorm }) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 45 }}
      style={{ pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={['#0f0f0f']} />
      <fog attach="fog" args={['#0f0f0f', 8, 18]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={0.7} color="#e0e0ff" />
      <pointLight position={[-2, 3, 1]} intensity={0.4} color="#7c4dff" distance={10} />
      <pointLight position={[0, 0.5, 1.5]} intensity={0.25} color="#4fc3f7" distance={5} />

      <CameraRig scrollProgress={scrollProgress} pointerNorm={pointerNorm} />
      <Desk />
      <Laptop />
      <Developer />
      <AmbientDust />
    </Canvas>
  );
};

export default DeveloperScene;
