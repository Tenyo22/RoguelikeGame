import Loot from "./Loot.js"
import Monster from "./Monster.js"
import Stairs from "./Stairs.js"

export const lootTable = [
    { name: 'Long Sword', color: '#FF5252', ascii: '&', offset: { x: 6, y: 3 }, quantity: 1 },
    { name: 'Health Potion', color: '#FF3D00', ascii: '?', offset: { x: 6, y: 3 }, quantity: 1 },
    { name: 'Gold coin', color: '#EEFF41', ascii: '$', offset: { x: 3, y: 3 }, quantity: 1 },
    { name: 'Light Armor', color: '#FFAB40', ascii: '#', offset: { x: 4, y: 3 }, quantity: 1 },
]

export const monsterTable = [
    { name: 'Ogre', color: '#00E676', ascii: 'O', offset: { x: 2, y: 2 }, health: 6 },
    { name: 'Kobold', color: '#76FF03', ascii: 'k', offset: { x: 4, y: 3 }, health: 3 },
    { name: 'Slime', color: '#1DE9B6', ascii: 'S', offset: { x: 3, y: 2 }, health: 2 },
    { name: 'Dragon', color: '#FF3D00', ascii: 'D', offset: { x: 2, y: 3 }, health: 10 },
]

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

class Spawner {
    constructor(world) {
        this.world = world
    }

    spawn(spanwCount, createEntity) {
        for (let count = 0; count < spanwCount; count++) {
            let entity = createEntity()
            this.world.add(entity)
            this.world.moveToSpace(entity)
        }
    }

    spawnLoot(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Loot(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tileSize,
                lootTable[getRandomInt(lootTable.length)])
        })
    }

    spawnMonsters(spanwCount) {
        this.spawn(spanwCount, () => {
            return new Monster(
                getRandomInt(this.world.width - 1),
                getRandomInt(this.world.height - 1),
                this.world.tileSize,
                monsterTable[getRandomInt(monsterTable.length)]
            )
        })
    }

    spawnStairs() {
        let stairs = new Stairs(
            getRandomInt(this.world.width - 1),
            getRandomInt(this.world.height - 1),
            this.world.tileSize
        );
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }
}

export default Spawner