import React from 'react'

import { ComputerJSX } from '@/components/models/ComputerV2_anim'
import { MeshReflectorMaterial } from '@react-three/drei'

export function Computernew({ scale, position, rotation, planeYesNo }) {
  return (
    <>
      <group scale={scale} rotation={rotation} position={position}>
        <mesh position={[0, 0, 4]} rotation={[(-90 * Math.PI) / 180, 0, 0]}>
          {planeYesNo ? (
            <>
              <planeGeometry receiveShadow args={[450, 450, 2]} />
              <MeshReflectorMaterial
                blur={[0, 0]}
                mixBlur={0} 
                mixStrength={1}
                mixContrast={1}
                resolution={256} 
                mirror={1}
                depthScale={0}
                minDepthThreshold={0.9} 
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25} 
                distortion={1}
                debug={0}
                reflectorOffset={0.2} 
              />
            </>
          ) : (
            <></>
          )}
        </mesh>
        <ComputerJSX />
      </group>
    </>
  )
}
