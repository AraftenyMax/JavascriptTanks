const weaponTypes = {
    default: {damage: 10, speed: 10, coolDown: 3},
    shrapnel: {damage: 20, speed: 20, coolDown: 2.5},
    armourPiercing: {damage: 40, speed: 30, coolDown: 3},
    artillery: {damage: 50, speed: 40, coolDown: 5}
}

const armourTypes = {
    composite: {defense: 50},
    reactive: {defense: 40},
    ceramic: {defense: 30},
    default: {defense: 10}
}

const renderEngine = {
    canvas: 0,
    dom: 1
}

const textureIds = {
    wall: 'wall-texture',
    ground: 'ground-texture',
    flag: 'flag-texture',
    player: 'player-texture'
}

const mapMarkers = {
    empty: -1,
    wall: 0,
    bonus: 1,
    enemy: 2,
    player: 3,
    flag: 4,
    bullet: 5
}

const bonuses = {
    armour: {value: 50, time: 30},
    healthPoints: {value: 60, time: 40},
    invincibility: {time: 10},
    attack: {value: 20, time: 60},
    speed: {value: 30, time: 50}
}

const moveSpeeds = {
    low: 10,
    medium: 30,
    high: 50
}

const directionAngle = {
    up: 0,
    left: 90,
    down: 180,
    right: 270
};

export {weaponTypes, armourTypes, mapMarkers,
     moveSpeeds, bonuses, renderEngine, textureIds,
    directionAngle};