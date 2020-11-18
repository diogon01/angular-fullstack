'use strict'
const Database = use('Database');
const Atividade = use('App/Models/Atividade')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with atividades
 */
class AtividadeController {
  /**
   * Show a list of all atividades.
   * GET atividades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    let atividades;
    let { all, pageNumber, pageSize, filter } = request.get();
    pageNumber = (all) ? null : pageNumber || 1;
    pageSize = (all) ? null : pageSize || 30;

    try {
      let atividades = Atividade.query().orderBy('id', 'desc')

      if (filter && filter != "") {
        const filtro = await Atividade.query()
          .where('nome', 'LIKE', '%' + filter + '%')
          .orWhere('tipo', 'LIKE', '%' + filter + '%')
          .orWhere('prioridade', 'LIKE', '%' + filter + '%')
          .orWhere('descricao', 'LIKE', '%' + filter + '%')
          .pluck('id');

        atividades.whereIn('id', filtro);
      }

      //return await atividades.paginate(page, perPage);
      return await atividades.paginate(pageNumber, pageSize);
    } catch (error) {
      response.send(error);
    }
  }

  /**
   * Render a form to be used for creating a new atividade.
   * GET atividades/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new atividade.
   * POST atividades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single atividade.
   * GET atividades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let atividade = await Atividade.findBy('id', request.params.id);
    return atividade
  }

  /**
   * Render a form to update an existing atividade.
   * GET atividades/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update atividade details.
   * PUT or PATCH atividades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a atividade with id.
   * DELETE atividades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const id = request.params.id;
    try {
      const deletar = await Ficha.findOrFail(id);
      return await deletar.delete();
    } catch (error) {
      response.send(error)
    }
  }
}

module.exports = AtividadeController
