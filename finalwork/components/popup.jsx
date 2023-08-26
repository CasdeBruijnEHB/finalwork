import React, { useState, useEffect } from 'react'
import { ModelDesk } from '@/components/models/RoomDeskNew'
import { Html} from '@react-three/drei'

export function Popup({type,data}) {
    const [textState,setTextState]=useState()
    console.log(" we have a click with:")
    console.log(type,", ", data)

    useEffect(() => {
    switch (type) {
    case 'era':
    setTextState(<>
        <p>Chosen for this era</p>
        <p></p>
    </>
    )
      break;
    case 'track':
    setTextState(<p>Chosen for this track</p>)
      break;
    case 'genre':
    setTextState(<p>Chosen for this genre</p>)
      break;
    default:
      break; 
    }

  }, [type]);
    
  
    return(<>
     <Html>
        <div className="absolute z-50 bg-black text-white">{textState}</div>
      </Html>
    </>)
}