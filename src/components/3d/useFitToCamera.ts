"use client";

import { useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fitObjectToCamera, normalizeModelScale } from "@/lib/camera/fitModel";

export function useFitToCamera(object: THREE.Object3D | null, enabled = true) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const normalized = useRef(false);

  useLayoutEffect(() => {
    if (!enabled || !object || !(camera instanceof THREE.PerspectiveCamera)) return;
    if (!normalized.current) {
      normalizeModelScale(object);
      normalized.current = true;
    }
    fitObjectToCamera(camera, object);
  }, [camera, object, enabled, size.width, size.height]);
}
