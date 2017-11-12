const MapHandler = require('./map')

module.exports = app => {
  new MapHandler(app)
}
