'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipment extends Model {
    static get fillable() {
        return ['uid', 'brand', 'equipment'];
    }
}

module.exports = Equipment
