"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ColorMaterial = { color: THREE.Color };

function useColorLerp(color: string, ref: React.RefObject<ColorMaterial | null>) {
  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  useFrame((_, delta) => {
    if (ref.current && ref.current.color) {
      ref.current.color.lerp(targetColor, delta * 6);
    }
  });
}

type JuiceSwirlProps = {
  color: string;
  progress?: number;
};

function SwirlBand({ color, offset }: { color: string; offset: number }) {
  const geometry = useMemo(() => {
    const points = Array.from({ length: 13 }, (_, index) => {
      const t = index / 12;
      const angle = offset + t * Math.PI * 1.55;
      const radius = 0.98 + Math.sin(t * Math.PI) * 0.58;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * 2.7 + Math.sin(t * Math.PI * 2 + offset) * 0.22,
        Math.sin(angle) * radius - 0.08
      );
    });
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, 0.065, 10, false);
  }, [offset]);

  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  useColorLerp(color, matRef);

  return (
    <mesh geometry={geometry} castShadow>
      <meshPhysicalMaterial
        ref={matRef}
        color={color}
        roughness={0.16}
        metalness={0.04}
        clearcoat={0.95}
        clearcoatRoughness={0.08}
        transmission={0.08}
        thickness={0.35}
        transparent
        opacity={0.82}
      />
    </mesh>
  );
}

function DropletMaterial({ color }: { color: string }) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  useColorLerp(color, matRef);
  return (
    <meshPhysicalMaterial
      ref={matRef}
      color={color}
      roughness={0.12}
      clearcoat={1}
      clearcoatRoughness={0.06}
      transmission={0.12}
    />
  );
}

function Droplets({ color }: { color: string }) {
  const drops = useMemo(
    () => [
      [-1.18, 0.72, 0.18, 0.085],
      [1.12, 0.36, 0.42, 0.06],
      [-0.88, -0.68, 0.38, 0.07],
      [0.9, -0.82, 0.16, 0.1],
      [0.4, 1.12, -0.12, 0.05],
      [-0.38, -1.24, -0.12, 0.06],
    ] as const,
    []
  );

  return (
    <group>
      {drops.map(([x, y, z, scale], index) => (
        <mesh key={index} position={[x, y, z]} scale={scale} castShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <DropletMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

/** Real-time 3D liquid geometry: curved tubes plus individual droplets. */
export default function JuiceSwirl3D({ color, progress = 0 }: JuiceSwirlProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const idle = Math.sin(state.clock.elapsedTime * 0.55) * 0.05;
    groupRef.current.rotation.y = progress * Math.PI * 1.5 + idle;
    groupRef.current.rotation.z = Math.sin(progress * Math.PI) * 0.1;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <SwirlBand color={color} offset={0.2} />
      <SwirlBand color={color} offset={Math.PI + 0.7} />
      <Droplets color={color} />
    </group>
  );
}
