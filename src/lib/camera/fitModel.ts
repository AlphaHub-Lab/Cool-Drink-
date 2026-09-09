import * as THREE from "three";
import { MODEL_FIT } from "@/lib/brand/canonical";

export function calculateBoundingBox(object: THREE.Object3D): THREE.Box3 {
  object.updateWorldMatrix(true, true);
  return new THREE.Box3().setFromObject(object);
}

export function calculateBoundingSphere(object: THREE.Object3D): THREE.Sphere {
  const box = calculateBoundingBox(object);
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere);
  return sphere;
}

export function normalizeModelScale(
  object: THREE.Object3D,
  targetHeight = MODEL_FIT.targetHeight
): number {
  const box = calculateBoundingBox(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  const height = Math.max(size.y, 0.0001);
  const scale = targetHeight / height;
  object.scale.multiplyScalar(scale);
  object.updateWorldMatrix(true, true);
  const recentered = calculateBoundingBox(object);
  const center = new THREE.Vector3();
  recentered.getCenter(center);
  object.position.sub(center);
  return scale;
}

export function setCameraTarget(
  camera: THREE.PerspectiveCamera,
  target: THREE.Vector3,
  position?: THREE.Vector3
) {
  if (position) camera.position.copy(position);
  camera.lookAt(target);
  camera.updateProjectionMatrix();
}

export function fitObjectToCamera(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  options: {
    padding?: number;
    minDistance?: number;
    maxDistance?: number;
    target?: THREE.Vector3;
  } = {}
): { distance: number; size: THREE.Vector3; sphere: THREE.Sphere } {
  const padding = options.padding ?? MODEL_FIT.padding;
  const minDistance = options.minDistance ?? MODEL_FIT.minDistance;
  const maxDistance = options.maxDistance ?? MODEL_FIT.maxDistance;

  object.updateWorldMatrix(true, true);
  const box = calculateBoundingBox(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere);

  const fov = THREE.MathUtils.degToRad(camera.fov);
  const fitHeightDistance = (sphere.radius * padding) / Math.tan(fov / 2);
  const fitWidthDistance = fitHeightDistance / Math.max(camera.aspect, 0.0001);
  const distance = THREE.MathUtils.clamp(
    Math.max(fitHeightDistance, fitWidthDistance),
    minDistance,
    maxDistance
  );

  const target = options.target ?? sphere.center.clone();
  const dir = camera.position.clone().sub(target);
  if (dir.lengthSq() < 0.0001) dir.set(0, 0.05, 1);
  dir.normalize().multiplyScalar(distance);
  camera.position.copy(target).add(dir);
  camera.lookAt(target);
  camera.updateProjectionMatrix();

  return { distance, size, sphere };
}

export function fitObjectToViewport(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D
) {
  normalizeModelScale(object);
  return fitObjectToCamera(camera, object);
}
