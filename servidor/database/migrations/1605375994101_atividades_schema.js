'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtividadesSchema extends Schema {
  up () {
    this.create('atividades', (table) => {
      table.increments()
      table.string('nome', 25).notNullable()
      table.enum('tipo',['MANUTENCAO', 'DESENVOLVIMENTO', 'DOCUMENTACAO']).notNullable()
      table.enum('prioridade', ['NORMAL', 'URGENTE']).notNullable()
      table.string('descricao', 120)
      table.date('data_realizacao').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('atividades')
  }
}

module.exports = AtividadesSchema
