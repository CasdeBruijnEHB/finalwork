"use client";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Floor from "@/components/floor";

export default function Home() {
  return (
    <main>
      <div className="scene">
        <Canvas
          shadows
          className="canvas"
          camera={{
            position: [-6, 7, 7],
          }}
        >
          <ambientLight color={"white"} intensity={0.3} />
          <Floor />
        </Canvas>
      </div>
    </main>
  );
}
