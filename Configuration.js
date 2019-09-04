const gameKeyNames = {
    moveUp: 'moveup',
    moveDown: 'movedown',
    moveLeft: 'moveleft',
    moveRight: 'moveright',
    shoot: 'shoot',
    pause: 'pause',
    showKeySettings: 'showkeysettings',
    showMenu: 'showmenu'
};

const gameKeyCodes = {
    [gameKeyNames.moveUp]: 38,
    [gameKeyNames.moveDown]: 40,
    [gameKeyNames.moveLeft]: 37,
    [gameKeyNames.moveRight]: 39,
    [gameKeyNames.shoot]: 32,
    [gameKeyNames.pause]: 80,
    [gameKeyNames.showKeySettings]: 75,
    [gameKeyNames.showMenu]: 27
};

const screenNames = {
    loadingScreen: 'loadingscreen',
    menuScreen: 'menuscreen',
    missionSelectScreen: 'missionselectscreen',
    missionScreen: 'missionscreen',
    optionsScreen: 'optionsscreen',
    keyBindingChangeScreen: 'keyBindingChangeScreen',
    statisticsScreen: 'statisticsscreen',
    upgradeScreen: 'upgradescreen'
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
const keyEvent = 'keydown';
const selectedMenuItemClass = 'selected-menu-item';

export {gameKeyCodes, mapMarkers, resources, canvasWidth,
    canvasHeight, resourceNames, cellSize, screenElemSelectType, screenNames,
    keyEvent, selectedMenuItemClass, gameKeyNames
};