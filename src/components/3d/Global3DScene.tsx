import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, PerspectiveCamera } from "@react-three/drei";
import { SCENE_CAMERA } from "@/lib/brand/canonical";
import * as THREE from "three";
import JuiceBottle3D from "./JuiceBottle3D";
import { SlothSurfing, SlothParachuting, SlothChilling, SlothJetpack } from "./SlothAdventures";

export const FLAVORS = [
  { name: "MANGO\nMADNESS", color: "#ffe4b5", liquidColor: "#FF9F1C", label: "MANGO", bg: "#FF9F1C" },
  { name: "STRAWBERRY\nSMASH", color: "#ffe4e1", liquidColor: "#E71D36", label: "STRAW", bg: "#E71D36" },
  { name: "WATERMELON\nWAVE", color: "#e8ffe8", liquidColor: "#2EC4B6", label: "MELON", bg: "#2EC4B6" },
  { name: "GRAPE\nGRAVITY", color: "#f4e4ff", liquidColor: "#4B0082", label: "GRAPE", bg: "#4B0082" }
];

interface SceneProps {
  currentSection: string;
  heroFlavorIndex: number;
  heroFillLevel: number;
  mangoProgress: number;
  strawProgress: number;
  melonProgress: number;
  grapeProgress: number;
}

export default function Global3DScene({ 
  currentSection, 
  heroFlavorIndex, 
  heroFillLevel,
  mangoProgress,
  strawProgress,
  melonProgress,
  grapeProgress
}: SceneProps) {
  const heroGroupRef = useRef<THREE.Group>(null);
  const parachutingRef = useRef<THREE.Group>(null);
  const surfingRef = useRef<THREE.Group>(null);
  const chillingRef = useRef<THREE.Group>(null);
  const jetpackRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (heroGroupRef.current) heroGroupRef.current.visible = currentSection === "hero";
    if (parachutingRef.current) parachutingRef.current.visible = currentSection === "mango";
    if (surfingRef.current) surfingRef.current.visible = currentSection === "strawberry";
    if (chillingRef.current) chillingRef.current.visible = currentSection === "watermelon";
    if (jetpackRef.current) jetpackRef.current.visible = currentSection === "grape";

    // Hero bottle continuous rotation
    if (heroGroupRef.current && currentSection === "hero") {
      heroGroupRef.current.rotation.y += delta * 1.5;
    }

    /* 
      Cinematic Scroll Movement:
      Odd (1, 3): Start Right (10), go Left to (3.5)
      Even (2, 4): Start Left (-10), go Right to (-3.5)
    */
    if (parachutingRef.current) {
      parachutingRef.current.position.x = -8 + mangoProgress * 11.5;
    }
    if (surfingRef.current) {
      surfingRef.current.position.x = 8 - strawProgress * 11.5;
    }
    if (chillingRef.current) {
      chillingRef.current.position.x = -8 + melonProgress * 11.5;
    }
    if (jetpackRef.current) {
      jetpackRef.current.position.x = 8 - grapeProgress * 11.5;
    }
  });

  const flavor = FLAVORS[heroFlavorIndex];

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={SCENE_CAMERA.fov}
        near={SCENE_CAMERA.near}
        far={SCENE_CAMERA.far}
        position={[...SCENE_CAMERA.position]}
      />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={3} castShadow />
      <directionalLight position={[-5, -10, -5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={4.0} color="#ffffff" distance={20} decay={2} />
      
      <Environment preset="studio" />

      {/* HERO SCENE */}
      <group ref={heroGroupRef} position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <JuiceBottle3D 
            color={flavor.color} 
            liquidColor={flavor.liquidColor} 
            label={flavor.label} 
            scale={0.5}
            floating={false}
            fillLevel={heroFillLevel}
          />
        </Float>
      </group>

      {/* SECTION 1: MANGO */}
      <group ref={parachutingRef} position={[10, 0, -3]} rotation={[0, -0.4, 0]}>
        <SlothParachuting />
      </group>

      {/* SECTION 2: STRAWBERRY */}
      <group ref={surfingRef} position={[-10, -0.5, -3]} rotation={[0, 0.4, 0]}>
        <SlothSurfing />
      </group>

      {/* SECTION 3: WATERMELON */}
      <group ref={chillingRef} position={[10, -0.5, -3]} rotation={[0, -0.2, 0]}>
        <SlothChilling />
      </group>

      {/* SECTION 4: GRAPE */}
      <group ref={jetpackRef} position={[-10, 0, -3]} rotation={[0, 0.4, 0]}>
        <SlothJetpack />
      </group>
    </>
  );
}
