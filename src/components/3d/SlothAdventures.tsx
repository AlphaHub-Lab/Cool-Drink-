"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import JuiceBottle3D from "./JuiceBottle3D";

/* ────────────────────────────────────────────
   SLOTH 3D — Procedural stylized sloth character
   Built from spheres, capsules, cylinders
──────────────────────────────────────────── */

const SLOTH_FUR = "#8B7355";
const SLOTH_FACE = "#D4C5A9";
const SLOTH_DARK = "#3D2B1F";
const SLOTH_NOSE = "#2D1B0E";

function SlothHead({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main head */}
      <mesh castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.9} />
      </mesh>
      {/* Face patch */}
      <mesh position={[0, -0.02, 0.25]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={SLOTH_FACE} roughness={0.95} />
      </mesh>
      {/* Eye masks — dark patches */}
      <mesh position={[-0.1, 0.05, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={SLOTH_DARK} roughness={0.95} />
      </mesh>
      <mesh position={[0.1, 0.05, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={SLOTH_DARK} roughness={0.95} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.1, 0.05, 0.35]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[0.1, 0.05, 0.35]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Eye highlights */}
      <mesh position={[-0.09, 0.06, 0.38]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.11, 0.06, 0.38]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, -0.06, 0.38]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={SLOTH_NOSE} roughness={0.5} />
      </mesh>
      {/* Smile */}
      <mesh position={[0, -0.12, 0.34]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.05, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color={SLOTH_DARK} />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.3, 0.15, 0]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.95} />
      </mesh>
      <mesh position={[0.3, 0.15, 0]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.95} />
      </mesh>
    </group>
  );
}

function SlothBody() {
  return (
    <group>
      {/* Torso */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.5, 16, 32]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.9} />
      </mesh>
      {/* Belly patch */}
      <mesh position={[0, -0.55, 0.2]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color={SLOTH_FACE} roughness={0.95} />
      </mesh>
    </group>
  );
}

function SlothArm({ side, rotation = [0, 0, 0] as [number, number, number], holding = false }: { side: "left" | "right"; rotation?: [number, number, number]; holding?: boolean }) {
  const x = side === "left" ? -0.35 : 0.35;
  const clawRot = side === "left" ? 0.3 : -0.3;

  return (
    <group position={[x, -0.4, 0]} rotation={rotation}>
      {/* Upper arm */}
      <mesh castShadow>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.9} />
      </mesh>
      {/* Forearm */}
      <mesh position={[0, -0.35, 0.1]} rotation={[0.5, 0, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.9} />
      </mesh>
      {/* Claws */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.04, -0.65, 0.25]} rotation={[0.8, clawRot, 0]}>
          <coneGeometry args={[0.015, 0.08, 8]} />
          <meshStandardMaterial color={SLOTH_DARK} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function SlothLeg({ side }: { side: "left" | "right" }) {
  const x = side === "left" ? -0.18 : 0.18;
  return (
    <group position={[x, -1.05, 0]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.09, 0.3, 8, 16]} />
        <meshStandardMaterial color={SLOTH_FUR} roughness={0.9} />
      </mesh>
      {/* Foot */}
      <mesh position={[0, -0.25, 0.05]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={SLOTH_DARK} roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ───── FULL SLOTH ───── */
export function Sloth3D({ position = [0, 0, 0] as [number, number, number], scale = 1, rotation = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  return (
    <group ref={ref} position={position} scale={scale} rotation={rotation}>
      <SlothHead position={[0, 0.1, 0]} />
      <SlothBody />
      <SlothArm side="left" rotation={[0.3, 0, 0.4]} />
      <SlothArm side="right" rotation={[-0.2, 0, -0.5]} />
      <SlothLeg side="left" />
      <SlothLeg side="right" />
    </group>
  );
}

/* ────────────────────────────────────────────
   SCENE: SLOTH SURFING
──────────────────────────────────────────── */
function Surfboard() {
  return (
    <group rotation={[0, 0, 0.05]}>
      {/* Board */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.05, 2.2]} />
        <meshStandardMaterial color="#FF9F1C" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, 0.026, 0]}>
        <boxGeometry args={[0.1, 0.005, 2.0]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Fin */}
      <mesh position={[0, -0.05, -0.8]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#E71D36" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Wave({ offset = 0 }: { offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + offset) * 0.15;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + offset) * 0.05;
    }
  });
  return (
    <mesh ref={ref} position={[offset * 2, -0.3, 0]} receiveShadow>
      <torusGeometry args={[1.5, 0.3, 8, 32, Math.PI]} />
      <meshStandardMaterial color="#1E90FF" roughness={0.4} opacity={0.7} transparent />
    </mesh>
  );
}

export function SlothSurfing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <Sloth3D position={[0, 0.6, 0]} rotation={[0, 0.2, 0]} />
        <Surfboard />
        {/* Sloth holding a juice bottle */}
        <group position={[0.4, 0.9, 0.2]} rotation={[0, 0.5, 0.3]} scale={0.35}>
          <JuiceBottle3D
            color="#ffe4b5"
            liquidColor="#FF9F1C"
            label="MANGO"
            floating={false}
          />
        </group>
      </group>
      {/* Waves */}
      <Wave offset={0} />
      <Wave offset={1.5} />
      <Wave offset={-1.5} />
      {/* Water plane */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0066AA" roughness={0.3} opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

/* ────────────────────────────────────────────
   SCENE: SLOTH PARACHUTING
──────────────────────────────────────────── */
function Parachute({ color = "#E71D36" }: { color?: string }) {
  return (
    <group position={[0, 2.5, 0]}>
      {/* Canopy */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Canopy stripes */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} rotation={[0, angle, 0]}>
            <sphereGeometry args={[1.21, 32, 16, -0.15, 0.3, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} side={THREE.DoubleSide} opacity={0.6} transparent />
          </mesh>
        );
      })}
      {/* Strings */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 1.1;
        const z = Math.sin(angle) * 1.1;
        return (
          <mesh key={i} position={[x / 2, -1.2, z / 2]}>
            <cylinderGeometry args={[0.005, 0.005, 2.5, 4]} />
            <meshStandardMaterial color="#444444" />
          </mesh>
        );
      })}
    </group>
  );
}

function Cloud({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={1} opacity={0.8} transparent />
      </mesh>
      <mesh position={[0.4, 0.1, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={1} opacity={0.8} transparent />
      </mesh>
      <mesh position={[-0.35, 0.05, 0.1]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={1} opacity={0.8} transparent />
      </mesh>
    </group>
  );
}

export function SlothParachuting() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <Sloth3D position={[0, -0.3, 0]} rotation={[0.1, 0, 0]} />
        <Parachute color="#E71D36" />
        {/* Sloth gripping juice bottles in each paw */}
        <group position={[-0.5, 0.1, 0.3]} rotation={[0.3, 0.5, 0.4]} scale={0.3}>
          <JuiceBottle3D color="#ffe4b5" liquidColor="#E71D36" label="STRAW" floating={false} />
        </group>
        <group position={[0.5, 0.2, 0.2]} rotation={[-0.2, -0.3, -0.3]} scale={0.3}>
          <JuiceBottle3D color="#ffe4e4" liquidColor="#4B0082" label="GRAPE" floating={false} />
        </group>
      </group>
      {/* Clouds */}
      <Cloud position={[-3, 1, -2]} />
      <Cloud position={[3.5, 0.5, -3]} />
      <Cloud position={[0, 2, -4]} />
      <Cloud position={[-2, -1, -2.5]} />
    </group>
  );
}

/* ────────────────────────────────────────────
   SCENE: SLOTH CHILLING IN HAMMOCK
──────────────────────────────────────────── */
function Hammock() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = (i / 20) * Math.PI;
      pts.push(new THREE.Vector3((i / 20) * 3 - 1.5, -Math.sin(t) * 0.5, 0));
    }
    return pts;
  }, []);

  return (
    <group>
      {/* Hammock net */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#D4A574" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Support ropes */}
      <mesh position={[-1.3, 0.5, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.01, 0.01, 1.2, 4]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh position={[1.3, 0.5, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.01, 0.01, 1.2, 4]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {/* Palm tree trunks */}
      <mesh position={[-2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 3, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.95} />
      </mesh>
      <mesh position={[2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 3, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.95} />
      </mesh>
      {/* Palm leaves */}
      {[-2, 2].map((x, idx) => (
        <group key={idx} position={[x, 1.5, 0]}>
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * 0.6, 0.1, Math.sin(angle) * 0.6]} rotation={[0.5, angle, 0.3]}>
                <coneGeometry args={[0.3, 1, 4]} />
                <meshStandardMaterial color="#228B22" roughness={0.8} side={THREE.DoubleSide} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

export function SlothChilling() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <Sloth3D position={[0, 0, 0]} rotation={[-0.5, 0, 0]} scale={0.8} />
      <Hammock />
      {/* Juice bottle beside the sloth */}
      <group position={[0.6, -0.3, 0.3]} rotation={[0.5, 0.3, 0.2]} scale={0.35}>
        <JuiceBottle3D color="#c8ffc8" liquidColor="#2EC4B6" label="MELON" floating={false} />
      </group>
    </group>
  );
}

/* ────────────────────────────────────────────
   SCENE: SLOTH JETPACK (For Grape)
──────────────────────────────────────────── */
function Jetpack() {
  return (
    <group position={[0, 0.1, -0.3]}>
      {/* Main Tanks */}
      <mesh position={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#A9A9A9" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#A9A9A9" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Flames */}
      <mesh position={[-0.2, -0.4, 0]}>
        <coneGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.2, -0.4, 0]}>
        <coneGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export function SlothJetpack() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      <Sloth3D position={[0, 0, 0]} rotation={[0.3, 0, 0]} />
      <Jetpack />
      {/* Sloth holding grape juice */}
      <group position={[0, -0.2, 0.4]} rotation={[-0.2, 0, 0]} scale={0.3}>
        <JuiceBottle3D color="#ffe4e4" liquidColor="#4B0082" label="GRAPE" floating={false} />
      </group>
    </group>
  );
}
