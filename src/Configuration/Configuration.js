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

const serviceNames = {
    inputService: 'inputmanager',
    keyboardService: 'keyboardmanager',
    resourceService: 'resourcemanager',
    missionsList: 'missionslist',
    screenFlowCallbacks: 'screenflowcallbacks'
};

const cellSize = 40;
const canvasWidth = 500;
const canvasHeight = 500;
const defaultModalWidth = 640;
const defaultModalHeight = 480;
const defaultWindowWidth = 640;
const defaultWindowHeight = 'auto';
const selectedMenuItemClass = 'selected-menu-item';
const modalWindowClass = 'modal-window';

export {mapMarkers, resources, canvasWidth,
    canvasHeight, resourceNames, cellSize, screenElemSelectType, screenNames,
    selectedMenuItemClass, modalWindowClass, defaultModalHeight, defaultModalWidth,
    defaultWindowWidth, defaultWindowHeight, serviceNames
};