'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
 const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint('App/Models/Atividade',  (faker) => {
    var ds_tipo = faker.pickone(['MANUTENCAO', 'DESENVOLVIMENTO', 'DOCUMENTACAO'])
    return {
        nome: faker.sentence({ words: 2 }),
        tipo: ds_tipo,
        prioridade: ds_tipo == 'DESENVOLVIMENTO' ? 'NORMAL' : faker.pickone(['NORMAL', 'URGENTE']),
        descricao: faker.sentence({ words: 6 }),
        data_realizacao: faker.date()
    }
})


