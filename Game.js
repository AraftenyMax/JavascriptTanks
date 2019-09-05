import ScreenManager from "./Screens/ScreenManager";
import {screenNames} from "./Configuration";
import ResourceManagerInstance from "./GameComponents/ResourceManager";


class Game {
    constructor() {
        this.screenManager = new ScreenManager(ResourceManagerInstance);
        this.init();
    }

    init() {
        this.screenManager.showLoadingScreen();
        ResourceManagerInstance.loadResources().then(() => {
            this.screenManager.sendIntent(null, screenNames.loadingScreen, {isReady: true});
        });
    }

    start() {
        this.screenManager.showLoadingScreen();
    }
}

export default Game;