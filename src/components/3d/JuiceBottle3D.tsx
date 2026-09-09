"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

interface BottleProps {
  color: string;
  liquidColor: string;
  label: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floating?: boolean;
  fillLevel?: number; // 0.0 to 1.0
}

function BottleBody({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.42, 2.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.4}
          opacity={0.8}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          thickness={0.5}
          ior={1.5}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      <mesh position={[0, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 32]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.5}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>
    </group>
  );
}

function Liquid({ color, level = 0.85 }: { color: string; level?: number }) {
  const liquidRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Level determines the height of the liquid. 0 = empty, 1 = full.
  // Full height is roughly 2.0 (inside the 2.2 bottle).
  const maxLiquidHeight = 2.0;
  const currentHeight = Math.max(0.01, maxLiquidHeight * level);
  const yPos = -1.1 + currentHeight / 2;

  return (
    <mesh ref={liquidRef} position={[0, yPos, 0]}>
      <cylinderGeometry args={[0.35, 0.39, currentHeight, 32]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.1}
        roughness={0.2}
        opacity={0.9}
        transparent={false}
      />
    </mesh>
  );
}

function BottleNeck() {
  return (
    <group position={[0, 1.1, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.38, 0.5, 32]} />
        <meshPhysicalMaterial
          color="#e8e8e8"
          transmission={0.8}
          roughness={0.1}
          thickness={0.3}
          ior={1.5}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.5, 32]} />
        <meshPhysicalMaterial
          color="#f0f0f0"
          transmission={0.8}
          roughness={0.1}
          thickness={0.2}
          ior={1.5}
        />
      </mesh>
      <mesh position={[0, 0.76, 0]}>
        <torusGeometry args={[0.18, 0.02, 16, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} />
      </mesh>
    </group>
  );
}

function BottleCap({ color }: { color: string }) {
  return (
    <group position={[0, 1.95, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.25, 32]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.22, 0, Math.sin(angle) * 0.22]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.02, 0.2, 0.01]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

function BottleLabel({ label, color }: { label: string; color: string }) {
  return (
    <group position={[0, 0.1, 0.41]}>
      {/* Front Label Background */}
      <mesh>
        <planeGeometry args={[0.65, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0} opacity={1} />
      </mesh>
      
      {/* Funky Brand Text */}
      <Text
        position={[0, 0.15, 0.01]}
        color="#1a1a1a"
        fontSize={0.18}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor={color}
        fontWeight="bold"
      >
        NO FILTER
      </Text>
      
      {/* Flavor Banner */}
      <mesh position={[0, -0.05, 0.005]}>
        <planeGeometry args={[0.55, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <Text
        position={[0, -0.05, 0.01]}
        color="#ffffff"
        fontSize={0.08}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {label}
      </Text>
      
      {/* Back Label */}
      <mesh position={[0, 0, -0.82]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.5, 0.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function JuiceBottle3D({
  color = "#ffcc00",
  liquidColor = "#FF9F1C",
  label = "MANGO",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  floating = true,
  fillLevel = 0.85,
}: BottleProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && floating) {
      // gentle idle rotation if floating
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const bottle = (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <BottleBody color={color} />
      <Liquid color={liquidColor} level={fillLevel} />
      <BottleNeck />
      <BottleCap color={liquidColor} />
      <BottleLabel label={label} color={liquidColor} />
    </group>
  );

  if (floating) {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        {bottle}
      </Float>
    );
  }

  return bottle;
}
