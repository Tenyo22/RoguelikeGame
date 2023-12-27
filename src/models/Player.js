import Entity from "./Entity.js"

class Player extends Entity {
    inventory = []
    attributes = {
        name: 'Player',
        ascii: '@',
        health: 10
    }

    move(dx, dy) {
        if (this.attributes.health <= 0) return
        this.x += dx
        this.y += dy
    }

    add(item) {
        const existItem = this.inventory.find(i => i.attributes.name === item.attributes.name)

        if (existItem && item.attributes.name === 'Long Sword') return

        if (existItem) existItem.attributes.quantity += item.attributes.quantity || 1
        else this.inventory.push(item)
    }

    copyPlayer() {
        let newPlayer = new Player()
        Object.assign(newPlayer, this)
        return newPlayer
    }
}

export default Player