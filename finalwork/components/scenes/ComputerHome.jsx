import React, { useState, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { MeshReflectorMaterial } from '@react-three/drei'

export function ComputerHome({ scale, position, rotation, planeYesNo }) {
  //const { nodes, materials } = useLoader(GLTFLoader, '/suzanne.gltf')
  const gltf = useGLTF('/glbs/computerV2_anim.glb')
  const { nodes, materials, animations } = useGLTF('/glbs/computerV2_anim.glb')
  const { actions, names } = useAnimations(animations)

  return (
    <>
      <group>
        <group scale={scale} rotation={rotation} position={position}>
          <mesh
            position={[0, -1.9, -2]}
            rotation={[(-85 * Math.PI) / 180, 0, 0]}
          >
            {planeYesNo ? (
              <>
                <planeGeometry args={[250, 250, 2]} />
                <MeshReflectorMaterial
                  blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
                  mixBlur={0} // How much blur mixes with surface roughness (default = 1)
                  mixStrength={1} // Strength of the reflections
                  mixContrast={1} // Contrast of the reflections
                  resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
                  mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                  depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
                  minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                  maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                  depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                  distortion={1} // Amount of distortion based on the distortionMap texture
                  debug={0}
                  reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                />
              </>
            ) : (
              <></>
            )}
          </mesh>

          {nodes && <primitive object={nodes.Scene} />}
          {materials &&
            Array.isArray(materials) &&
            materials.map((material, index) => (
              <primitive  key={index} object={material} />
            ))}
        </group>
      </group>
    </>
  )
}