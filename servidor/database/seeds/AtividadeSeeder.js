'use strict'

/*
|--------------------------------------------------------------------------
| AtividadeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class AtividadeSeeder {
  async run () {
    const ativididade = Factory.model('App/Models/Atividade').createMany(100);
  }
}

module.exports = AtividadeSeeder
