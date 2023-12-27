import Entity from "./Entity.js";

class Loot extends Entity {
    action(verb, world) {
        if (verb === 'bump') {
            const hasLongSword = world.player.inventory.some(item => item.attributes.name === 'Long Sword')
            if (this.attributes.name === 'Long Sword' && hasLongSword) {
                world.addToHistory(`There is already a Long Sword in your inventory!`)
                return
            }

            world.player.add(this)
            world.remove(this)
        }
        if (verb === 'drop') {
            console.log('Drop', this)
        }
    }
}

export default Loot