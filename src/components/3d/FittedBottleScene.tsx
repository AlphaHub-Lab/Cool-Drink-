"use client";

import { useEffect, useRef, useState } from "react";
import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import JuiceBottle3D from "./JuiceBottle3D";
import { useFitToCamera } from "./useFitToCamera";
import JuiceSwirl3D from "./JuiceSwirl3D";

function FittedBottle({
  color,
  liquidColor,
  label,
  progress,
}: {
  color: string;
  liquidColor: string;
  label: string;
  progress: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const [object, setObject] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    setObject(ref.current);
  }, []);

  useFitToCamera(object, true);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.z = Math.sin(progress * Math.PI) * 0.07;
  });

  return (
    <group ref={ref}>
      <JuiceBottle3D
        color={color}
        liquidColor={liquidColor}
        label={label}
        scale={1}
        floating={false}
        fillLevel={0.88}
      />
      <JuiceSwirl3D color={liquidColor} progress={progress} />
    </group>
  );
}

export default function FittedBottleScene({
  color,
  liquidColor,
  label,
  progress = 0,
  eager = false,
}: {
  color: string;
  liquidColor: string;
  label: string;
  progress?: number;
  eager?: boolean;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  return (
    <div ref={holderRef} className="relative h-full min-h-[14rem] w-full">
      {active ? (
        <SceneCanvas className="h-full w-full">
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 7, 6]} intensity={2.5} />
          <directionalLight position={[-4, 2, 4]} intensity={1.2} color="#c9d8ff" />
          <pointLight position={[0, 1, 4]} intensity={1.8} color="#ffffff" distance={8} />
          <FittedBottle color={color} liquidColor={liquidColor} label={label} progress={progress} />
        </SceneCanvas>
      ) : null}
    </div>
  );
}
