'use strict'

const Schema = use('Schema')

class EquipmentSchema extends Schema {
  up () {
    this.create('equipment', (table) => {
      table.increments('id').primary()
      table.string('uid', 255).notNullable()
      table.string('brand', 255).notNullable()
      table.string('equipment', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('equipment')
  }
}

module.exports = EquipmentSchema