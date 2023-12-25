import { useEffect, useRef, useState } from "react"
import InputManager from "./InputManager.js"

const ReactRogue = ({ width, height, tilesize }) => {
    const canvasRef = useRef(null)
    let inputManager = new InputManager()
    const [player, setPlayer] = useState({ x: 64, y: 128 })

    const handleInput = (action, data) => {
        console.log(`handle action: ${action}:${JSON.stringify(data)}`)
        let newPlayer = { ...player }
        newPlayer.x += data.x * tilesize
        newPlayer.y += data.y * tilesize
        setPlayer(newPlayer)
    }

    useEffect(() => {
        console.log('Bind input')
        inputManager.bindKeys()
        inputManager.subscribe(handleInput)
        return () => {
            inputManager.unbindKeys()
            inputManager.unsubscribe(handleInput)
        }
    })

    useEffect(() => {
        console.log('Draw to canvas')
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, width * tilesize, height * tilesize)
        ctx.fillStyle = '#000'
        ctx.fillRect(player.x, player.y, 16, 16)
    })

    return (
        <canvas
            ref={canvasRef}
            width={width * tilesize}
            height={height * tilesize}
            style={{ border: '1px solid black' }}>
        </canvas>
    )
}

export default ReactRogue