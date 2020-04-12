define([], function() {
  const _groups = [
    { name: 'items', instance: null },
    { name: 'bullets', instance: null },
    { name: 'doors', instance: null },
    { name: 'slideDoors', instance: null },
    { name: 'switches', instance: null },
    { name: 'enemies', instance: null },
    { name: 'enemies', instance: null },
    { name: 'EnemyWall', instance: null },
  ]

  return {
    getGroup: function(groupName) {
      return _groups.find(g => g.name === groupName)
    },
    getGroups: function() {
      return _groups
    }
  }

})
