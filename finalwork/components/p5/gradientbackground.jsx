import React from 'react'
import Sketch from 'react-p5'

const GradientBackground = () => {
  const setup = (p, canvasParentRef) => {
    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight
    p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef)
  }

  const draw = (p) => {
    p.background(0)

    const gradient = p.drawingContext.createLinearGradient(0, 0, 0, p.height)
    gradient.addColorStop(0, '#FF0000')
    gradient.addColorStop(1, '#0000FF')

    p.drawingContext.fillStyle = gradient
    p.rect(0, 0, p.width, p.height)
  }

  return <Sketch className="z-20" setup={setup} draw={draw} />
}

export default GradientBackground
