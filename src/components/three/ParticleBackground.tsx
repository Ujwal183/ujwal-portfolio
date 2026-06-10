"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.03;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;

    // Mouse interaction
    const { mouse } = state;
    ref.current.rotation.x += mouse.y * 0.01;
    ref.current.rotation.y += mouse.x * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00F5FF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

function SecondaryParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = -state.clock.elapsedTime * 0.02;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7B61FF"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <ParticleField />
        <SecondaryParticles />
      </Canvas>
    </div>
  );
}
