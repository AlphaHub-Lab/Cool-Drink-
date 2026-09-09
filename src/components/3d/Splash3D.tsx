"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export default function Splash3D({ onComplete }: { onComplete: () => void }) {
  const dropRef = useRef<THREE.Mesh>(null);
  const rippleRef = useRef<THREE.Mesh>(null);
  const [state, setState] = useState(0); // 0: dropping, 1: splashing, 2: fading

  useEffect(() => {
    // 1. Fall for 0.8s
    const t1 = setTimeout(() => setState(1), 800);
    // 2. Splash and fill camera for 0.8s
    const t2 = setTimeout(() => setState(2), 1600);
    // 3. Fade out for 1s, then notify completion
    const t3 = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  useFrame((_state, delta) => {
    if (state === 0 && dropRef.current) {
      // Fall down rapidly
      dropRef.current.position.y -= delta * 15;
      // Elongate droplet while falling
      dropRef.current.scale.y = 1.5;
      dropRef.current.scale.x = 0.8;
      dropRef.current.scale.z = 0.8;
    }
    if (state === 1) {
      // Hide droplet, expand splash
      if (dropRef.current) dropRef.current.scale.set(0, 0, 0);
      if (rippleRef.current) {
         // Scale up massively to engulf the camera (camera is at z=8, splash is at z=5, diff = 3)
         // A radius of 10 will definitely cover the camera
         rippleRef.current.scale.lerp(new THREE.Vector3(15, 15, 15), delta * 8);
      }
    }
    if (state === 2 && rippleRef.current) {
      // Fade out opacity while continuing to grow slightly
      rippleRef.current.scale.lerp(new THREE.Vector3(20, 20, 20), delta * 2);
      const mat = rippleRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat.opacity > 0) {
        mat.opacity -= delta * 1.5;
      }
    }
  });

  return (
    <group position={[0, 0, 5]}>
      {/* Falling Droplet */}
      <mesh ref={dropRef} position={[0, 10, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial 
          color="#FF9F1C" 
          metalness={0.2} 
          roughness={0.0} 
          clearcoat={1}
          transmission={0.9} 
          thickness={1}
          ior={1.33}
        />
      </mesh>
      
      {/* Ripple/Explosion that engulfs camera */}
      <mesh ref={rippleRef} position={[0, -2, 0]} scale={[0.001, 0.001, 0.001]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial 
          color="#FF9F1C" 
          metalness={0.1} 
          roughness={0.2} 
          clearcoat={1}
          transparent 
          opacity={1} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
}
