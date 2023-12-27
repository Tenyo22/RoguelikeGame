import Entity from "./Entity.js";

class Monster extends Entity {
    constructor(x, y, tileSize, attributes) {
        super(x, y, tileSize, attributes)
        this.damage = attributes.damage || 1
    }

    action(verb, world) {
        if (verb === 'bump') {
            // Attack
            const playerDamage = world.player.calculateDamage(world)
            this.attributes.health -= playerDamage

            if (this.attributes.health <= 0) {
                world.addToHistory(`${this.attributes.name} dies!`)
                world.remove(this)
            } else {
                world.addToHistory(`Player attacks ${this.attributes.name}! ${this.attributes.name}'s health = ${this.attributes.health}!`)

                const monsterDamage = this.damage
                world.player.attributes.health -= monsterDamage

                if (world.player.attributes.health <= 0) world.addToHistory('You have died!')
                else world.addToHistory(`You have ${world.player.attributes.health} health`)
            }
        }
    }
}

export default Monster