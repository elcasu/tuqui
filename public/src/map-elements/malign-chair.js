define(['map-elements/map-element'], function(MapElement) {
  function MalignChair (x, y) {
    MapElement.call(this, x, y, 'malignChair')
  }

  MalignChair.prototype = Object.create(MapElement.prototype)
  MalignChair.prototype.constructor = MalignChair

  return MalignChair
})
