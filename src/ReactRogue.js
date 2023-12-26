import { useEffect, useRef, useState } from "react"
import InputManager from "./models/InputManager.js"
import World from "./models/World.js"
import Spawner from "./models/Spawner.js"

const ReactRogue = ({ width, height, tileSize }) => {
    const canvasRef = useRef(null)
    // const [player, setPlayer] = useState(new Player(1, 2, tileSize))
    const [world, setWorld] = useState(new World(width, height, tileSize))
    const inputManager = new InputManager()

    const handleInput = (action, data) => {
        console.log(`handle action: ${action}:${JSON.stringify(data)}`)
        let newWorld = new World()
        Object.assign(newWorld, world)
        newWorld.movePlayer(data.x, data.y)
        setWorld(newWorld)
    }

    useEffect(() => {
        console.log('Create Map!')
        const newWorld = new World()
        Object.assign(newWorld, world)
        newWorld.createCellularMap()
        newWorld.moveToSpace(world.player)

        let spawner = new Spawner(newWorld)
        spawner.spawnLoot(10)
        spawner.spawnMonsters(6)
        spawner.spawnStairs()
        setWorld(newWorld)
    }, [])

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
        ctx.clearRect(0, 0, width * tileSize, height * tileSize)
        world.draw(ctx)
    })

    return (
        <>
            <canvas
                ref={canvasRef}
                width={width * tileSize}
                height={height * tileSize}
                style={{ border: '1px solid black', background: 'dimgray' }}>
            </canvas>
            <ul>
                {world.player.inventory.map((item, index) => (
                    <li key={index}>{item.attributes.name}</li>
                ))}
            </ul>
            <ul>
                {world.history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </>
    )
}

export default ReactRogue