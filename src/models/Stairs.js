import Entity from "./Entity.js";
import Spawner from "./Spawner.js";

class Stairs extends Entity {
    attributes = {
        name: 'Stairs', color: 'white', ascii: '>', offset: { x: 2, y: 2 },
    }

    action(verb, world) {
        if (verb === 'bump') {
            world.addToHistory('You move down stairs...')
            
            // Reiniciar mapa y mover al jugador a nueva ubicacion
            world.createCellularMap()
            world.moveToSpace(world.player)
            
            // Eliminamos todas las entidades
            world.entities = [world.player]
            
            // Generamos nuevos elementos en el mapa
            let spawner = new Spawner(world)
            spawner.spawnLoot(10)
            spawner.spawnMonsters(6)
            spawner.spawnStairs()
        }
    }
}

export default Stairs