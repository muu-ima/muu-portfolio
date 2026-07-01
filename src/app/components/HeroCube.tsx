"use client";

import { Edges, Float, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const faces = [
  {
    label: "PROJECTS",
    position: [0, 0, 1.01] as const,
    rotation: [0, 0, 0] as const,
  },
  {
    label: "SKILLS",
    position: [1.01, 0, 0] as const,
    rotation: [0, Math.PI / 2, 0] as const,
  },
  {
    label: "ABOUT",
    position: [0, 0, -1.01] as const,
    rotation: [0, Math.PI, 0] as const,
  },
  {
    label: "CONTACT",
    position: [-1.01, 0, 0] as const,
    rotation: [0, -Math.PI / 2, 0] as const,
  },
];

function CubeMesh() {
  const cubeRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!cubeRef.current) {
      return;
    }

    cubeRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.18 - 0.62;
    cubeRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.28) * 0.08 + 0.38;
  });

  return (
    <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.55}>
      <group ref={cubeRef}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhysicalMaterial
            color="#16213f"
            emissive="#172c68"
            emissiveIntensity={0.42}
            metalness={0.35}
            roughness={0.24}
            clearcoat={0.7}
            clearcoatRoughness={0.24}
            transmission={0.12}
            transparent
            opacity={0.88}
          />
          <Edges color="#75f6ff" linewidth={1.4} />
        </mesh>

        {faces.map((face) => (
          <Html
            key={face.label}
            center
            distanceFactor={6.2}
            occlude
            position={face.position}
            rotation={face.rotation}
            transform
          >
            <span className="cube-face-label">{face.label}</span>
          </Html>
        ))}
      </group>
    </Float>
  );
}

export default function HeroCube() {
  return (
    <Canvas
      camera={{ position: [3.35, 2.6, 4.4], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        color="#f7fbff"
        intensity={1.45}
        position={[3.8, 4.2, 5]}
      />
      <pointLight color="#75f6ff" intensity={2.8} position={[-2.6, 1.2, 2.4]} />
      <pointLight color="#8f6bff" intensity={2.2} position={[2.2, -1.2, -2.8]} />
      <CubeMesh />
    </Canvas>
  );
}
