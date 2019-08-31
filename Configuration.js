let keyCodes = {
    moveUp: 38,
    moveDown: 40,
    moveLeft: 37,
    moveRight: 39,
    fire: 32,
};

const mapMarkers = {
    empty: -1,
    wall: 0,
    bonus: 1,
    enemy: 2,
    player: 3,
    flag: 4,
    bullet: 5
};

const resourceNames = {
    templateNames: {
        player: 'player_'
    },
    sprites: {
        playerIdle: 'player_idle',
        ground: 'ground',
        wall: 'wall'
    }
};

const screenElemSelectType = {
    htmlId: 0,
    htmlClass: 1,
    htmlTag: 2
};

const resources = {
    sprites: {
        [resourceNames.sprites.playerIdle]: 'http://localhost:9000/player-sprite.png', 
        [resourceNames.sprites.ground]: 'http://localhost:9000/ground-sprite.jpg', 
        [resourceNames.sprites.wall]: 'http://localhost:9000/wall-sprite.jpg' 
    }
};

const cellSize = 40;
const canvasWidth = 500;
const canvasHeight = 500;

export {keyCodes, mapMarkers, resources, canvasWidth,
    canvasHeight, resourceNames, cellSize, screenElemSelectType};