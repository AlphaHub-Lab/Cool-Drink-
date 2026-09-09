"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { SCENE_CAMERA } from "@/lib/brand/canonical";

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  dpr?: [number, number];
}

export default function SceneCanvas({
  children,
  className,
  dpr = [1, 1.5],
}: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      camera={{
        fov: SCENE_CAMERA.fov,
        position: [...SCENE_CAMERA.position],
        near: SCENE_CAMERA.near,
        far: SCENE_CAMERA.far,
      }}
      onCreated={({ gl, scene }) => {
        gl.toneMappingExposure = 1.05;
        scene.background = null;
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
