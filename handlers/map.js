const express = require('express')
const { ErrorHandler } = require('../middlewares')
const { generateError } = require('../helpers/errors')
const { save } = require('../helpers/files')

module.exports = class MapController {
  constructor (app) {
    // save map
    const router = express.Router()
    router.post('/', ErrorHandler(this.save))

    app.use('/api/maps', router)
  }

  async save (req, res) {
    if (!req.body.name) {
      throw generateError(400, 'map name is required')
    }
    const name = req.body.name.toLowerCase()
    await save(`${__dirname}/../maps/${name}.json`, req.body.map)
    res.status(200).send(req.map)
  }
}
