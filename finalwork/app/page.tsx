"use client";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Floor from "@/components/floor";
import { Computer } from "@/components/computer";
import { Environment, OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Stats, OrbitControls, Lightformer } from "@react-three/drei";
import { ComputerTwee } from "@/components/Scene";

export default function Home() {
  const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

  return (
    <main>
      <div className="scene">
        <Canvas
          shadows
          className="canvas"
          camera={{
            position: [-10, 7, 12],
            rotation: [deg2rad(-20), 0, 0],
          }}
          style={{ background: "white" }}
        >
          <Environment
            files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
            background
          />
          <Suspense fallback={null}>
            <ambientLight color={"white"} intensity={0.5} />
            <Computer />
            <gridHelper args={[10, 10, `white`, `gray`]} />

            <Stats />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
