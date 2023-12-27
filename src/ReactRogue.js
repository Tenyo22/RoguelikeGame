import { useEffect, useRef, useState } from "react"
import InputManager from "./models/InputManager.js"
import World from "./models/World.js"
import Spawner, { lootTable, monsterTable } from "./models/Spawner.js"

const ReactRogue = ({ width, height, tileSize }) => {
    const canvasRef = useRef(null)
    // const [player, setPlayer] = useState(new Player(1, 2, tileSize))
    const [world, setWorld] = useState(new World(width, height, tileSize))
    const inputManager = new InputManager()

    const handleInput = (action, data) => {
        // console.log(`handle action: ${action}:${JSON.stringify(data)}`)
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
            <section style={{ display: 'flex' }}>
                <canvas
                    ref={canvasRef}
                    width={width * tileSize}
                    height={height * tileSize}
                    style={{ border: '1px solid black', background: 'dimgray' }}>
                </canvas>

                <section style={{ marginLeft: '10px', width: '800px', border: '1px solid black' }}>
                    {/* Player inventory */}
                    <div style={{ margin: '10px', border: '1px solid black', background: '#E0E0E0' }}>
                        <h2 style={{ textAlign: 'center' }}>Player Inventory</h2>
                        <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'end'}}>
                            {world.player.inventory.map((item, index) => (
                                <li key={index} style={{ marginBottom: '10px', width: '48%' }}>
                                    {item.attributes.name} {item.attributes.quantity > 1 ? `x${item.attributes.quantity}` : ''}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legend Map*/}
                    <div style={{ margin: '10px', textAlign: 'center', border: '1px solid black', background: '#455A64' }}>
                        <h2>Legend</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <ul style={{ listStyleType: 'none' }}>
                                <li style={{ color: 'white', marginBottom: '10px' }}><strong>@</strong> - Player (Health: {world.player.attributes.health})</li>
                                <li style={{ color: 'white' }}><strong>{'>'}</strong> - Stairs</li>
                            </ul>

                            <ul style={{ listStyleType: 'none' }}>
                                {lootTable.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '10px', color: item.color }}>
                                        <strong>{item.ascii}</strong> - {item.name}
                                    </li>
                                ))}
                            </ul>

                            <ul style={{ listStyleType: 'none' }}>
                                {monsterTable.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '10px', color: item.color }}>
                                        <strong>{item.ascii}</strong> - {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* History console */}
                    <div style={{ margin: '10px', border: '1px solid black' }}>
                        <h2 style={{ textAlign: 'center' }}>History</h2>
                        <ul>
                            {world.history.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </section >
        </>
    )
}

export default ReactRogue