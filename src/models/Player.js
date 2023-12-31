import Entity from "./Entity.js"

class Player extends Entity {
    inventory = []
    damage = 1
    longSwordUses = 3

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

    useHealthPotion(world) {
        const potionIndex = this.inventory.findIndex(item => item.attributes.name === 'Health Potion')

        if (potionIndex !== -1) {
            const healthPotion = this.inventory[potionIndex]

            if (healthPotion.attributes.quantity > 0) {
                // Salud actual no exceda el limite de 10
                if (this.attributes.health < 10) {
                    // Calcular la cantidad de salud a curar
                    const healingAmount = Math.min(healthPotion.attributes.quantity, 10 - this.attributes.health)
                    this.attributes.health += healingAmount
                    healthPotion.attributes.quantity -= healingAmount // Reduce la cantidad de pocion

                    world.addToHistory(`You have healed for ${healingAmount} health. You have ${this.attributes.health} health!`)

                    // Eliminar pocion del inventario del player
                    if (healthPotion.attributes.quantity <= 0) this.inventory.splice(potionIndex, 1)

                } else world.addToHistory(`You are already at fully health. No need to use a health potion!`)
            } else world.addToHistory(`You don't have any more Health Potions`)
        } else world.addToHistory(`You don't have any Health Potion`)
    }

    // Calcular el daño del jugador, considerando el arma equipada
    calculateDamage(world) {
        let totalDamage = this.damage
        const weapon = this.inventory.find(item => item.attributes.name === 'Long Sword')
        if (weapon) {
            if (this.longSwordUses > 0) {
                totalDamage++
                this.longSwordUses--
            }
            weapon.attributes.uses--
            if (this.longSwordUses <= 0) {
                const swordIndex = this.inventory.findIndex(item => item.attributes.name === 'Long Sword')
                if (swordIndex !== -1) {
                    this.longSwordUses = 3
                    this.inventory.splice(swordIndex, 1)
                    world.addToHistory(`Your Long has Sword has broken!`)
                }
            }
        }
        return totalDamage
    }

    copyPlayer() {
        let newPlayer = new Player()
        Object.assign(newPlayer, this)
        return newPlayer
    }
}

export default Player