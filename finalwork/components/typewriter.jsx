import React from 'react'
import Typewriter from 'typewriter-effect'

//https://www.geeksforgeeks.org/how-to-add-typewriter-effect-in-next-js/
export function TypingEffect({ intro, textpart1, textpart2, outro }) {
  return (
    <div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(5)
            .typeString(intro)
            .pauseFor(1500)
            .changeDelay(5)
            .typeString(textpart1)
            .pauseFor(1500)
            .changeDelay(5)
            .typeString(textpart2)
            .pauseFor(1500)
            .changeDelay(5)
            .typeString(outro)
            .pauseFor(1500)
            .changeDelay(5)
            .start()
        }}
      />
    </div>
  )
}
