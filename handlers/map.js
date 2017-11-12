const express = require('express')
const { ErrorHandler } = require('../middlewares')
const { generateError } = require('../helpers/errors')
const { save, load } = require('../helpers/files')

module.exports = class MapController {
  constructor (app) {
    const router = express.Router()

    // save map
    router.post('/', ErrorHandler(this.save))

    // load map
    router.get('/:name', ErrorHandler(this.load))

    app.use('/api/maps', router)
  }

  async save (req, res) {
    if (!req.body.name) {
      throw generateError(400, 'map name is required')
    }
    if (!req.body.map || !req.body.map.length) {
      throw generateError(400, 'map payload is required')
    }
    const name = req.body.name.toLowerCase()
    await save(`${__dirname}/../maps/${name}.json`, req.body.map)
    res.status(200).send(req.body.map)
  }

  async load (req, res) {
    const name = req.params.name.toLowerCase()
    const map = await load(`${__dirname}/../maps/${name}.json`)
    res.status(200).send(map)
  }
}
