'use client'
import DropZone from "./components/Dropzone"
import { useEffect,useState } from "react"

export default function Home() {
  const [screenDimensions, setScreenDimensions] = useState<[number, number]>([0, 0])

  useEffect(() => {

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    setScreenDimensions([screenWidth, screenHeight])
    
}, [screenDimensions])

const backgroundStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  width: screenDimensions[0] + 'px',
  height: screenDimensions[1] + 'px',
  backgroundColor: "#111420",
  margin: '-8px',
  padding: '0',
  alignItems: 'center',
  justifyContent: 'center'
}


  return (
    <div style={backgroundStyle}>
    <DropZone></DropZone>
    </div>
  )
}
