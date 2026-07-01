"use client";

import { Edges, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { DoubleSide, MathUtils } from "three";

type CubeLabel = "Projects" | "Skills" | "About" | "Contact";

type HeroCubeProps = {
  activeLabel: string;
  onFaceSelect?: (label: CubeLabel) => void;
};

type CubePointerEvent = ThreeEvent<PointerEvent>;

const faces: Array<{
  id: CubeLabel;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
}> = [
  {
    id: "Projects",
    label: "PROJECTS",
    position: [0, 0, 1.035] as const,
    rotation: [0, 0, 0] as const,
  },
  {
    id: "Skills",
    label: "SKILLS",
    position: [1.035, 0, 0] as const,
    rotation: [0, Math.PI / 2, 0] as const,
  },
  {
    id: "About",
    label: "ABOUT",
    position: [0, 0, -1.035] as const,
    rotation: [0, Math.PI, 0] as const,
  },
  {
    id: "Contact",
    label: "CONTACT",
    position: [-1.035, 0, 0] as const,
    rotation: [0, -Math.PI / 2, 0] as const,
  },
];

const targetRotations: Record<CubeLabel, number> = {
  Projects: 0,
  Skills: -Math.PI / 2,
  About: Math.PI,
  Contact: Math.PI / 2,
};

function isCubeLabel(label: string): label is CubeLabel {
  return label in targetRotations;
}

function lerpAngle(current: number, target: number, alpha: number) {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));

  return current + delta * alpha;
}

function getAngleDistance(current: number, target: number) {
  return Math.abs(Math.atan2(Math.sin(target - current), Math.cos(target - current)));
}

function getNearestFaceLabel(rotationY: number) {
  return faces.reduce<CubeLabel>((nearestLabel, face) => {
    const nearestDistance = getAngleDistance(
      rotationY,
      targetRotations[nearestLabel],
    );
    const faceDistance = getAngleDistance(rotationY, targetRotations[face.id]);

    return faceDistance < nearestDistance ? face.id : nearestLabel;
  }, "Projects");
}

function CubeMesh({ activeLabel, onFaceSelect }: HeroCubeProps) {
  const cubeRef = useRef<Group>(null);
  const elapsedTimeRef = useRef(0);
  const dragRef = useRef({
    hasMoved: false,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });
  const manualRotationRef = useRef({
    x: 0.26,
    y: targetRotations.Projects,
  });

  useFrame((_, delta) => {
    elapsedTimeRef.current += delta;

    if (!cubeRef.current) {
      return;
    }

    if (dragRef.current.isDragging) {
      cubeRef.current.position.y = Math.sin(elapsedTimeRef.current * 1.1) * 0.04;
      cubeRef.current.rotation.x = manualRotationRef.current.x;
      cubeRef.current.rotation.y = manualRotationRef.current.y;
      cubeRef.current.rotation.z = Math.sin(elapsedTimeRef.current * 0.72) * 0.018;
      return;
    }

    const selectedLabel = isCubeLabel(activeLabel) ? activeLabel : "Projects";
    const elapsedTime = elapsedTimeRef.current;
    const targetY =
      targetRotations[selectedLabel] + Math.sin(elapsedTime * 0.35) * 0.05;
    cubeRef.current.rotation.y = lerpAngle(cubeRef.current.rotation.y, targetY, 0.08);
    cubeRef.current.rotation.x = Math.sin(elapsedTime * 0.28) * 0.06 + 0.26;
    cubeRef.current.rotation.z = Math.sin(elapsedTime * 0.72) * 0.018;
    cubeRef.current.position.y = Math.sin(elapsedTime * 1.1) * 0.04;
  });

  const handlePointerDown = (event: CubePointerEvent) => {
    event.stopPropagation();

    if (!cubeRef.current) {
      return;
    }

    dragRef.current = {
      hasMoved: false,
      isDragging: true,
      lastX: event.nativeEvent.clientX,
      lastY: event.nativeEvent.clientY,
    };
    manualRotationRef.current = {
      x: cubeRef.current.rotation.x,
      y: cubeRef.current.rotation.y,
    };
  };

  const handlePointerMove = (event: CubePointerEvent) => {
    if (!dragRef.current.isDragging || !cubeRef.current) {
      return;
    }

    event.stopPropagation();

    const dx = event.nativeEvent.clientX - dragRef.current.lastX;
    const dy = event.nativeEvent.clientY - dragRef.current.lastY;

    if (Math.abs(dx) + Math.abs(dy) > 2) {
      dragRef.current.hasMoved = true;
    }

    manualRotationRef.current = {
      x: MathUtils.clamp(manualRotationRef.current.x + dy * 0.004, 0.04, 0.5),
      y: manualRotationRef.current.y + dx * 0.008,
    };
    dragRef.current.lastX = event.nativeEvent.clientX;
    dragRef.current.lastY = event.nativeEvent.clientY;
    cubeRef.current.rotation.x = manualRotationRef.current.x;
    cubeRef.current.rotation.y = manualRotationRef.current.y;
  };

  const handlePointerUp = (event: CubePointerEvent) => {
    if (!dragRef.current.isDragging) {
      return;
    }

    event.stopPropagation();
    dragRef.current.isDragging = false;

    if (dragRef.current.hasMoved) {
      onFaceSelect?.(getNearestFaceLabel(manualRotationRef.current.y));
    }
  };

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={cubeRef}
      scale={1.1}
    >
        <mesh>
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

        {faces.map((face) => {
          const isActive = face.id === activeLabel;

          return (
            <Text
              anchorX="center"
              anchorY="middle"
              color={isActive ? "#f7fbff" : "#9ff8ff"}
              fontSize={0.16}
              key={face.label}
              letterSpacing={0.08}
              outlineBlur={isActive ? 0.035 : 0.015}
              outlineColor={isActive ? "#75f6ff" : "#071229"}
              outlineOpacity={isActive ? 0.82 : 0.42}
              outlineWidth={isActive ? 0.018 : 0.01}
              position={face.position}
              renderOrder={2}
              rotation={face.rotation}
              textAlign="center"
            >
              {face.label}
              <meshBasicMaterial
                color={isActive ? "#f7fbff" : "#9ff8ff"}
                toneMapped={false}
                transparent
              />
            </Text>
          );
        })}

        {faces.map((face) => (
          <mesh
            key={`${face.label}-plate`}
            position={face.position}
            renderOrder={1}
            rotation={face.rotation}
          >
            <planeGeometry args={[1.18, 0.34]} />
            <meshBasicMaterial
              color={face.id === activeLabel ? "#75f6ff" : "#11284f"}
              depthWrite={false}
              opacity={face.id === activeLabel ? 0.24 : 0.16}
              transparent
            />
          </mesh>
        ))}

        {faces.map((face) => (
          <mesh
            key={`${face.label}-hit-area`}
            onClick={(event) => {
              event.stopPropagation();

              if (dragRef.current.hasMoved) {
                dragRef.current.hasMoved = false;
                return;
              }

              onFaceSelect?.(face.id);
            }}
            position={face.position}
            rotation={face.rotation}
          >
            <planeGeometry args={[2.02, 2.02]} />
            <meshBasicMaterial
              depthWrite={false}
              opacity={0}
              side={DoubleSide}
              transparent
            />
          </mesh>
        ))}
    </group>
  );
}

function CubeBase() {
  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh renderOrder={0}>
        <ringGeometry args={[1.18, 1.42, 128]} />
        <meshBasicMaterial
          color="#5d7dff"
          opacity={0.42}
          side={DoubleSide}
          transparent
        />
      </mesh>
      <mesh renderOrder={0} scale={[1.28, 1.28, 1]}>
        <ringGeometry args={[0.92, 0.96, 128]} />
        <meshBasicMaterial
          color="#1edcff"
          opacity={0.3}
          side={DoubleSide}
          transparent
        />
      </mesh>
      <mesh renderOrder={0} scale={[1.38, 1.38, 1]}>
        <circleGeometry args={[0.92, 128]} />
        <meshBasicMaterial
          color="#11356b"
          opacity={0.16}
          side={DoubleSide}
          transparent
        />
      </mesh>
    </group>
  );
}

function CameraTarget() {
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, 0.05, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

export default function HeroCube({ activeLabel, onFaceSelect }: HeroCubeProps) {
  return (
    <Canvas
      camera={{ position: [4.8, 1.35, 8.3], fov: 32 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <CameraTarget />
      <ambientLight intensity={0.6} />
      <directionalLight
        color="#f7fbff"
        intensity={1.45}
        position={[3.8, 4.2, 5]}
      />
      <pointLight color="#75f6ff" intensity={2.8} position={[-2.6, 1.2, 2.4]} />
      <pointLight color="#8f6bff" intensity={2.2} position={[2.2, -1.2, -2.8]} />
      <group position={[0, 0.18, 0]}>
        <CubeBase />
        <CubeMesh activeLabel={activeLabel} onFaceSelect={onFaceSelect} />
      </group>
    </Canvas>
  );
}
