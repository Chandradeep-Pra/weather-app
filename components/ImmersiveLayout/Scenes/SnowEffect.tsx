"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SnowParticles = () => {
  const count = 300;
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 50;
      arr[i + 1] = Math.random() * 40;
      arr[i + 2] = (Math.random() - 0.5) * 50;
    }
    return arr;
  }, [count]);

  const velocities = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = 0.1 + Math.random() * 0.5;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      positions.array[i * 3 + 1] -= velocities[i];
      if (positions.array[i * 3 + 1] < -10) {
        positions.array[i * 3 + 1] = 20;
      }
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const SnowEffect = () => {
  return (
    <Canvas
      className="absolute inset-0 z-0 !h-full !w-full"
      camera={{ position: [0, 0, 15], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <SnowParticles />
    </Canvas>
  );
};

export default SnowEffect;
