define([
  'characters/Player',
  'items/Heart',
  'items/Coin',
  'items/Gun',
  'items/Key',
  'map-elements/Door',
  'map-elements/SlideDoor',
  'map-elements/DoorSwitch',
  'map-elements/malign-chair',
  'characters/Spider',
  'characters/Spider2',
  'characters/Crocodile',
  'characters/Cocon',
  'characters/Espinosaurio',
  'characters/Oer',
  'map-elements/EnemyWall',
  'characters/Squarebot',
  'characters/LilShip',
  'map-elements/Platform',
  'map-elements/PlatformShort',
  'map-elements/TrickyPlatform',
  'characters/Grunion',
  'map-elements/Stair'
], function (
  Player,
  Heart,
  Coin,
  Gun,
  Key,
  Door,
  SlideDoor,
  DoorSwitch,
  MalignChair,
  Spider,
  Spider2,
  Crocodile,
  Cocon,
  Espinosaurio,
  Oer,
  EnemyWall,
  Squarebot,
  LilShip,
  Platform,
  PlatformShort,
  TrickyPlatform,
  Grunion,
  Stair
) {
  const _elements = {
    Player: { key: 'player', elClass: Player, unique: true },
    Heart: { key: 'heart', elClass: Heart, group: 'items' },
    Coin: { key: 'coin', elClass: Coin, group: 'items' },
    Gun: { key: 'gun', elClass: Gun, group: 'bullets' },
    Key: { key: 'key', elClass: Key, group: 'items', unique: true },
    Door: { key: 'door', elClass: Door, group: 'doors', unique: true },
    SlideDoor: { key: 'slideDoor', elClass: SlideDoor, group: 'slideDoors', collideable: true },
    DoorSwitch: { key: 'doorSwitch', elClass: DoorSwitch, group: 'switches' },
    MalignChair: { key: 'malignChair', elClass: MalignChair, group: 'items' },
    Spider: { key: 'spider', elClass: Spider, group: 'enemies' },
    Spider2: { key: 'spider2', elClass: Spider2, group: 'enemies' },
    Crocodile: { key: 'crocodile', elClass: Crocodile, group: 'enemies' },
    Cocon: { key: 'cocon', elClass: Cocon, group: 'enemies' },
    Espinosaurio: { key: 'espinosaurio', elClass: Espinosaurio, group: 'enemies' },
    Oer: { key: 'oer', elClass: Oer, group: 'enemies' },
    EnemyWall: { key: 'invisibleWall', elClass: EnemyWall, group: 'enemyWalls', visible: false },
    Squarebot: { key: 'squarebot', elClass: Squarebot, group: 'enemies' },
    LilShip: { key: 'lilShip', elClass: LilShip, group: 'enemies' },
    Platform: { key: 'platform', elClass: Platform, group: 'platforms', collideable: true },
    PlatformShort: { key: 'platformShort', elClass: PlatformShort, group: 'platforms', collideable: true },
    TrickyPlatform: { key: 'trickyPlatform', elClass: TrickyPlatform, group: 'trickyPlatforms', collideable: true },
    Grunion: { key: 'grunion', elClass: Grunion, group: 'enemies' },
    Stair: { key: 'stair', elClass: Stair, group: 'stairs' }
  }

  return {
    elements: _elements,
    createInstance: function(element, opts) {
      if (typeof element === 'string') {
        element = _elements.find(e => e.key === element)
      }
      return new element.elClass(opts.xPos, opts.yPos)
    }
  }
})
